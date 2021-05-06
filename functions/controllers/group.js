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
const client = require('firebase-tools');
// Auth Middleware
const authMiddleware = require('./authMiddleware');

// Fetch data from firestore
groupApp.get('/', async (req, res) => {
  const snapshot = await db.collectionGroup('/groups').where('userId', '==', userId).orderBy('createdAt', 'asc').get();

  let groups = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    groups.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(groups));
});

// Fetch data from firestore
groupApp.get('/auth', async (req, res) => {
  const userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('groups').where('userId', '==', userId).orderBy('createdAt', 'asc').get();

  let groups = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    groups.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(groups));
});

// Fetch data from firestore
groupApp.get('/selectGroup', authMiddleware, async (req, res) => {
  const userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('groups').where('userId', '==', userId).get();

  let groups = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    groups.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(groups));
});


// Fetch data from firestore
groupApp.get('/selectGroup/auth', authMiddleware, async (req, res) => {
  const userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('groups').where('userId', '==', userId).get();

  let groups = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    groups.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(groups));
});

// Post data to firestore
groupApp.post('/', authMiddleware, async (req, res) => {
  const group = req.body;
  await db.collection('users').doc(group.userId).collection('groups').add(group)

  // TODO push id with data, so we can delete right after id
  res.status(201).send(group);
});

// Update group data
groupApp.put('/', authMiddleware, async (req, res) => {
  const group = req.body;
  const userId = group.userId;
  await db.collection('users').doc(userId).collection('groups').doc(group.id).update(group);

  res.status(200).send(group);
});

// Delete selected data from firestore
groupApp.delete('/:id', authMiddleware, async (req, res) => {
  const userId = res.req.user.uid;
  const id = req.params.id;
  const collectionPath = `users/${userId}/groups/${id}`;
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

exports.groupApi = functions.https.onRequest(groupApp);
