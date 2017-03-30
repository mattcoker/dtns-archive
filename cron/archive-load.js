'use strict';

require('dotenv').config();
const request = require('request');
const parser = require('xml2json');
const firebaseAdmin = require('firebase-admin');
const htmlToJson = require('html-to-json');
const getYouTubeID = require('get-youtube-id');
const BPromise = require("bluebird");
const serviceAccountJSON = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

BPromise.promisifyAll(request);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountJSON),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const episodesRef = firebaseAdmin.database().ref('episodes');
let pageRequests = [];

for (let currPage = 1; currPage <= 50; currPage++) {
  console.log(`Requesting content for page ${currPage}`)
  pageRequests.push(request.getAsync('http://www.dailytechnewsshow.com/feed/?paged=' + currPage));
}

const parseEpisodeData = (episodeData) => {
  return new BPromise((resolve, reject) => {
    const currDateISO = (new Date()).toISOString();
    const episodeTitleParts = episodeData.title.split(' – ');
    const trimmedDesc = episodeData.description.slice(0, episodeData.description.indexOf(' MP3 Using a Screen Reader?'))

    htmlToJson.parse(episodeData['content:encoded'], {
      'iframes': ($doc)  => { return $doc.find('iframe'); }
    }).then((result) => {
      let youtubeURLs = Array.prototype.map.call(result.iframes, (iframe) => {
        let src = iframe.attribs.src;
        return (src.includes('youtube') || src.includes('youtu.be')) ? src : null;
      });
      youtubeURLs = youtubeURLs.filter((item) => { return item !== null });
      const youtubeId = (youtubeURLs[0]) ? getYouTubeID(youtubeURLs[0]) : null;

      if ((episodeData.category === 'Episode') || (episodeData.category.includes('Episode')) && episodeData.enclosure) {

        resolve({
          episodeNumber: (episodeTitleParts[0].replace('DTNS', '')) ? episodeTitleParts[0].replace('DTNS', '').trim() : '__empty__',
          episodeName: (episodeTitleParts[1]) ? episodeTitleParts[1].trim() : '__empty__',
          description: trimmedDesc,
          downloadURL: episodeData.enclosure.url,
          youtubeId: youtubeId,
          hosts: null,
          contributors: null,
          guests: null,
          airDate: (new Date(episodeData.pubDate)).toISOString(),
          createdAt: currDateISO,
          updatedAt: currDateISO,
          requiresReview: true
        });
      } else if ((episodeData.category === 'Episode') || (episodeData.category.includes('Episode'))) {
        reject(`${episodeData.category} is not a valid object type`);
      } else if (!episodeData.enclosure) {
        reject(`Enclosure is not set`);
      }

    });
  });
};


Promise.all(pageRequests).then((values) => {
  console.log('all done!');

  episodesRef
  .orderByChild("episodeNumber")
  .limitToLast(1000)
  .once("value")
  .then((snapshot) => {
    let data = snapshot.val();
    const existingEpisodeNumbers = [];
    for (let obj in data) {
      existingEpisodeNumbers.push(data[obj].episodeNumber);
    }

    for (let i = 0; i < values.length; i++) {
      let currBody = JSON.parse(parser.toJson(values[i].body));
      let podcastData = currBody.rss.channel;

      for (let item of podcastData.item) {
        let newEpisode = parseEpisodeData(item).then((newEpisode) => {
          if (item.category === 'Episode' && existingEpisodeNumbers.indexOf(newEpisode.episodeNumber) < 0 ) {
            console.log(`Episode #${newEpisode.episodeNumber} will be added`);
            episodesRef.push(newEpisode).then(() => {
              console.log(`Added episode #${newEpisode.episodeNumber} to the database`);
            });
          } else {
            console.log(`Ignored Episode #${newEpisode.episodeNumber}`);
          }
        });
      }
    }
  });
})