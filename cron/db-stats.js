'use strict';

require('dotenv').config({silent: true});
const firebaseAdmin = require('firebase-admin');
const BP = require('bluebird');
const serviceAccountJSON = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountJSON),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = firebaseAdmin.database();

Promise.all([
  db.ref('episodes').once('value'),
  db.ref('people').once('value'),
  db.ref('picks').once('value'),
  db.ref('topics').once('value')
]).then((data) => {

  db.ref(process.env.STATS_PATH).update({
    episodesCount: data[0].numChildren(),
    peopleCount: data[1].numChildren(),
    picksCount: data[2].numChildren(),
    topicsCount: data[3].numChildren()
  }).then(() => {
    console.log('Updated site statistics');
    process.exit();
  });
});
