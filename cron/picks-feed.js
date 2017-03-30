'use strict';

require('dotenv').config({silent: true});
const util = require('util');
const request = require('request');
const BPromise = require("bluebird");
const firebaseAdmin = require('firebase-admin');
const serviceAccountJSON = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountJSON),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const picksRef = firebaseAdmin.database().ref('picks');

request.get(process.env.PICKS_FEED, (error, response, body) => {
  if (error) {
    console.log('Error!');
    console.log(error);
    return;
  }

  const reqData = JSON.parse(body);

  createPicksFromData(reqData.feed.entry).then((freshPicks) => {
    picksRef.once("value", (snapshot) => {
      const existingPicks = snapshot.val();
      const existingPicksNames = [];
      for (let key in existingPicks) {
        existingPicksNames.push(existingPicks[key].name);
      }

      const dbUpdates = [];

      for (let index in freshPicks) {
        let currentPick = freshPicks[index];
        if (existingPicks && existingPicksNames.indexOf(currentPick.name) > -1) {
          console.log(`Ignored pick ${currentPick.name}`);
        } else {
          dbUpdates.push(new BPromise((resolve, reject) => {
            console.log(`Pick ${currentPick.name} will be added`);
            let newPickRef = picksRef.push(currentPick);
            console.log(`Added pick ${currentPick.name} to the database`);
            if (currentPick.episode) {
              firebaseAdmin.database().ref(`episodes/${currentPick.episode}/picks/${newPickRef.key}`).set(true).then(() => {
                resolve();
              });
              console.log(`Updated picks for Episode ID ${currentPick.episode}`);
            } else {
              resolve();
            }
          }));
        }
      }

      BPromise.all(dbUpdates).then(() => {
        process.exit();
      });
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      process.exit();
    });
  });

});

const createPicksFromData = (data) => {
  return new BPromise((resolve, reject) => {
    const episodesRef = firebaseAdmin.database().ref('episodes');
    const picksPromises = [];

    data.forEach((item) => {
      let startDate = new Date(item.gsx$episodedate.$t);
      let endDate = new Date(item.gsx$episodedate.$t);
      endDate.setHours(23,59,59,999);

      picksPromises.push(new BPromise((resolve, reject) => {
        episodesRef
        .orderByChild("airDate")
        .startAt(startDate.toISOString())
        .endAt(endDate.toISOString())
        .limitToFirst(1)
        .once("value", (snapshot) => {
          snapshot = snapshot.val();
          let currDate = new Date();
          let episodeKey = (snapshot) ? Object.keys(snapshot)[0] : null

          resolve({
            name: item.gsx$pickname.$t.replace(/\n\n/g, ",").trim(),
            category: item.gsx$category.$t,
            description: item.gsx$description.$t,
            episode: item.gsx$episodenumbertitle.$t,
            url: item.gsx$link.$t,
            episode: episodeKey,
            showNotesText: item.gsx$shownotestext.$t,
            createdAt: currDate,
            updatedAt: currDate
          });

        })
      }));
    });

    BPromise.all(picksPromises).then((allPicks) => {
      resolve(allPicks.filter((pick) => {
        return pick !== undefined;
      }));
    });
  });
};