//Express
const express = require('express');
const introApp = express();
// Cors
const cors = require('cors')
introApp.use(cors({ origin: true}));
// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const db = admin.firestore();


// Fetch data from firestore
introApp.get('/', async (req, res) => {
  const docRef = await db.collection('/introduction').doc("text");

  docRef.get().then((doc) => {
    if (doc.exists) {
        const introduction = doc.data();
      res.status(200).send(introduction);
    } else {
      res.status(200).send('');
    }
  })
});

// Post data to firestore
introApp.post('/', async (req, res) => {
  const introduction = req.body;
  await db.collection('introduction').doc('text').set({introduction})
  // TODO push id with data, so we can delete right after id
  res.status(201).send(introduction);
});


exports.introApi = functions.https.onRequest(introApp);
