//Express
const express = require('express');
const infoCardApp = express();
// Cors
const cors = require('cors')
infoCardApp.use(cors({ origin: true}));
// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const db = admin.firestore();
const client = require('firebase-tools');
// Auth Middleware
const authMiddleware = require('./authMiddleware');

// Fetch data from firestore
infoCardApp.get('/', async (req, res) => {
  let userId = res.req._parsedUrl.query;
  // const snapshot = await db.collection('/infoCards').where('userId', '==', userId).orderBy('createdAt', 'asc').get();
  const snapshot = await db.collectionGroup('infoCards').where('userId', '==', userId).orderBy('createdAt', 'asc').get();


  let infoCards = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    infoCards.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(infoCards));
});

// Fetch authenticated user data from firestore
infoCardApp.get('/auth', authMiddleware, async (req, res) => {
  let userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('infoCards').where('userId', '==', userId).orderBy('createdAt', 'asc').get();
  // db.collectionGroup('infoCards').where('userId', '==', userId).get()

  let infoCards = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    infoCards.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(infoCards));
});

// Post data to firestore
// db.collection('users').doc(user.uid).collection("reports").add
infoCardApp.post('/', authMiddleware, async (req, res) => {
  const infoCard = req.body;
  await db.collection('users').doc(infoCard.userId).collection('infoCards').add(infoCard)

  res.status(201).send(infoCard);
});

// Update Project data
infoCardApp.put('/', authMiddleware, async (req, res) => {
  const infoCard = req.body;
  const userId = infoCard.userId;
  await db.collection('users').doc(userId).collection('infoCards').doc(infoCard.id).update(infoCard);

  res.status(200).send(infoCard);
});

// Delete selected data from firestore
infoCardApp.delete('/:id', authMiddleware, async (req, res) => {
  let userId = res.req.user.uid;
  let id = req.params.id;

  let collectionPath = `users/${userId}/infoCards/${id}`;
  // console.log(collectionPath)
  // let collectionPath = db.collection('users').doc(req.params.userId).collection('infoCards').doc(req.params.id).delete();
  await client.firestore
      .delete(collectionPath, {
        project: process.env.GCLOUD_PROJECT,
        recursive: false,
        yes: true
      });

  res.status(200).send();
})

exports.infoCardApi = functions.https.onRequest(infoCardApp);
