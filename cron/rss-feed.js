'use strict';

require('dotenv').config();
const request = require('request');
const parser = require('xml2json');
const firebaseAdmin = require('firebase-admin');
const htmlToJson = require('html-to-json');
const getYouTubeID = require('get-youtube-id');
const BPromise = require("bluebird");
const serviceAccountJSON = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountJSON),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const episodesRef = firebaseAdmin.database().ref('episodes');

request.get(process.env.EPISODE_RSS_FEED, (error, response, body) => {
  if (error) {
    console.log('Error!');
    console.log(error);
    return;
  }

  const feedData = JSON.parse(parser.toJson(body));
  const podcastData = feedData.rss.channel;

  episodesRef
  .orderByChild("episodeNumber")
  .limitToLast(25)
  .once("value")
  .then((snapshot) => {
    let data = snapshot.val();
    const existingEpisodeNumbers = [];
    for (let obj in data) {
      existingEpisodeNumbers.push(data[obj].episodeNumber);
    }

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
  });
});

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

      resolve({
        episodeNumber: episodeTitleParts[0].replace('DTNS', '').trim(),
        episodeName: episodeTitleParts[1].trim(),
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
    });
  });
};
