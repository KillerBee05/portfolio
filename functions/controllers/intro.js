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
  const introduction = await db.collection('/introduction').get();

  // let introduction = [];
  // snapshot.forEach((doc) => {
  //   let id = doc.id;
  //   let data = doc.data();
  //
  //   skills.push({ id, ...data});
  // });

  res.status(200).send(introduction);
});

// Post data to firestore
introApp.post('/', async (req, res) => {
  const introduction = req.body;

  await db.collection('introduction').add(introduction)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(introduction);
});

// Update Project data
introApp.put('/', async (req, res) => {
  const introduction = req.body;
  await db.collection('introduction').doc(introduction.id).update(introduction);

  res.status(200).send(introduction);
});

// Delete selected data from firestore
introApp.delete('/:id', async (req, res) => {
  await db.collection('introduction').doc(req.params.id).delete();

  res.status(200).send();
})

exports.introApp = functions.https.onRequest(introApp);
