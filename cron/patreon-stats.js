'use strict';

require('dotenv').config();
const fs = require('fs');
const firebaseAdmin = require('firebase-admin');
const request = require('request');
const serviceAccountJSON = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountJSON),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

request.get('https://api.patreon.com/user/39956', (error, response, body) => {
  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);
    const newStats = body.linked.shift();
    const nextGoal = body.linked.find((obj) => {
      return obj.reached_at === null;
    });

    const patronCount = newStats.patron_count;
    const totalPledged = newStats.pledge_sum;
    const amountToNextGoal = nextGoal.amount_cents - newStats.pledge_sum;

    firebaseAdmin.database().ref(process.env.STATS_PATH).once('value').then((snapshot) => {
      let data = snapshot.val();
      firebaseAdmin.database().ref(process.env.STATS_PATH).update({
        patronCount: patronCount,
        totalPledged: totalPledged,
        amountToNextGoal: amountToNextGoal
      }).then((stats) => {
        console.log('Original Values:');
        console.log('\tPatron Count: ' + data.patronCount);
        console.log('\tPledge Amount: ' + data.totalPledged);
        console.log('\tAmount to Next Goal: ' + data.amountToNextGoal);

        console.log('New Values:');
        console.log('\tPatron Count: ' + patronCount);
        console.log('\tPledge Amount: ' + totalPledged);
        console.log('\tAmount to Next Goal: ' + amountToNextGoal);

        console.log('Successfully updated Patreon statistics.');
        process.exit();
      }).catch((err) => { console.log(err); });
    }).catch((err) => { console.log(err); });
  }
});
