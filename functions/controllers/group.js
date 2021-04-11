//Express
const express = require('express');
const groupApp = express();
// Cors
const cors = require('cors')
groupApp.use(cors({ origin: true}));
// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const db = admin.firestore();


// Fetch data from firestore
groupApp.get('/', async (req, res) => {
  const snapshot = await db.collection('/groups').get();

  let groups = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    groups.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(groups));
});

// Fetch data from firestore
groupApp.get('/selectGroup', async (req, res) => {
  const snapshot = await db.collection('/groups').get();

  let groups = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    groups.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(groups));
});

// Post data to firestore
groupApp.post('/', async (req, res) => {
  const group = req.body;

  await db.collection('groups').add(group)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(group);
});

// Update Project data
groupApp.put('/', async (req, res) => {
  const group = req.body;
  await db.collection('groups').doc(group.id).update(group);

  res.status(200).send(group);
});

// Delete selected data from firestore
groupApp.delete('/:id', async (req, res) => {
  await db.collection('groups').doc(req.params.id).delete();

  res.status(200).send();
})

exports.groupApi = functions.https.onRequest(groupApp);
