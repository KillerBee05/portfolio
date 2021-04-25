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


// Fetch data from firestore
infoCardApp.get('/', async (req, res) => {
  const snapshot = await db.collection('/infoCards').orderBy('createdAt', 'asc').get();

  let infoCards = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    infoCards.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(infoCards));
});

// Post data to firestore
infoCardApp.post('/', async (req, res) => {
  const infoCard = req.body;

  await db.collection('infoCards').add(infoCard)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(infoCard);
});

// Update Project data
infoCardApp.put('/', async (req, res) => {
  const infoCard = req.body;
  await db.collection('infoCards').doc(infoCard.id).update(infoCard);

  res.status(200).send(infoCard);
});

// Delete selected data from firestore
infoCardApp.delete('/:id', async (req, res) => {
  await db.collection('infoCards').doc(req.params.id).delete();

  res.status(200).send();
})

exports.infoCardApi = functions.https.onRequest(infoCardApp);
