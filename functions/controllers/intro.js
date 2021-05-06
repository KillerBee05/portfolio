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
const client = require('firebase-tools');
// Auth Middleware
const authMiddleware = require('./authMiddleware');

// Fetch data from firestore
introApp.get('/', async (req, res) => {
  // const userId = req.body.userId;
  // const userId = res.req._parsedUrl.query;
  const docRef = await db.collectionGroup('introduction').where('userId', '==', userId);

  docRef.get().then((doc) => {
    if (doc.exists) {
        const introduction = doc.data();
      res.status(200).send(introduction);
    } else {
      res.status(200).send('');
    }
  })
});

// Fetch data from firestore
introApp.get('/auth', async (req, res) => {
  const userId = res.req._parsedUrl.query;
  console.log(userId)
  // const collectionPath = `users/${userId}/introduction/text`;
  const docRef = await db.collectionGroup('introduction').where('userId', '==', userId);

  docRef.get().then((doc) => {
    if (doc.exists) {
        const introduction = doc.data();
        console.log("whats good")
      res.status(200).send(introduction);
    } else {
      console.log("OOOOOHHH NOthing")
      res.status(200).send('');
    }
  })
});

// Post data to firestore
introApp.post('/', authMiddleware, async (req, res) => {
  const introduction = req.body;
  console.log(introduction)
  await db.collection('users').doc(introduction.userId).collection('introduction').add(introduction)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(introduction);
});

// Post data to firestore
introApp.put('/', authMiddleware, async (req, res) => {
  const introduction = req.body;
  console.log(introduction)
  await db.collection('users').doc(introduction.userId).collection('introduction').doc("mv38JC6Dg26cD2QW0XeO").update(introduction)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(introduction);
});


exports.introApi = functions.https.onRequest(introApp);
