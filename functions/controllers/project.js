//Express
const express = require('express');
const projectApp = express();
// Cors
const cors = require('cors')
projectApp.use(cors({ origin: true}));
// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const db = admin.firestore();
const client = require('firebase-tools');
// Auth Middleware
const authMiddleware = require('./authMiddleware');
// projectApp.use(authMiddleware);

// Fetch data from firestore
projectApp.get('/', async (req, res) => {
  const snapshot = await db.collectionGroup('projects').where('userId', '==', userId).orderBy('createdAt', 'asc').get();
  // 5ZnEuZ2lD6O68k0vOUrmetY4OQm2
  // kNEjkZXvzmSLdpa96IqcY9wRftx2
  let projects = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    projects.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(projects));
});

// Fetch authenticated user data from firestore
projectApp.get('/auth', authMiddleware, async (req, res) => {
  const userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('projects').where('userId', '==', userId).orderBy('createdAt', 'asc').get();
  // db.collectionGroup('infoCards').where('userId', '==', userId).get()

  let projects = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    projects.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(projects));
});

// Post data to firestore
projectApp.post('/', authMiddleware, async (req, res) => {
  const project = req.body;
  await db.collection('users').doc(project.userId).collection('projects').add(project)

  res.status(201).send(project);
});

// Update Project data
projectApp.put('/', authMiddleware, async (req, res) => {
  const project = req.body;
  const userId = project.userId;

  await db.collection('users').doc(userId).collection('projects').doc(project.id).update(project);

  res.status(200).send(project);
});

// Delete selected data from firestore
projectApp.delete('/:id', authMiddleware, async (req, res) => {
  const userId = res.req.user.uid;
  const id = req.params.id;
  const collectionPath = `users/${userId}/projects/${id}`;
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

exports.projectApi = functions.https.onRequest(projectApp);
