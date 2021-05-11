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
introApp.get('/', authMiddleware, async (req, res) => {
  let userId = res.req._parsedUrl.query;
  const snapshot = await db.collection('account').doc(userId).collection('introduction').get();

  let introduction = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    introduction.push({ id, ...data});
  });

  res.status(200).send(introduction);
});

// Post data to firestore
introApp.post('/', authMiddleware, async (req, res) => {
  const introduction = req.body;
  await db.collection('users').doc(introduction.userId).collection('introduction').add(introduction)
  // await db.collection('users').doc(infoCard.userId).collection('infoCards').add(infoCard)

  res.status(201).send(introduction);
});

// Post data to firestore
introApp.put('/', authMiddleware, async (req, res) => {
  const introduction = req.body;
  const userId = introduction.userId;
  console.log(introduction)
  await db.collection('users').doc(userId).collection('account').doc(introduction.id).update(introduction)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(introduction);
});

// Delete account data from firestore
introApp.delete('/:id', authMiddleware, async (req, res) => {
  let userId = res.req.user.uid;
  let id = req.params.id;

  let collectionPath = `users/${userId}/account/${id}`;
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


exports.introApi = functions.https.onRequest(introApp);
