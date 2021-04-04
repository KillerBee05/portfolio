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
admin.initializeApp();
const db = admin.firestore();

// Fetch data from firestore
projectApp.get('/', async (req, res) => {
  const snapshot = await db.collection('/projects').get();

  let projects = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    projects.push({ id, ...data});
  });

  res.status(200).send(JSON.stringify(projects));
});

// Post data to firestore
projectApp.post('/', async (req, res) => {
  const project = req.body;

  await db.collection('projects').add(project)
  // TODO push id with data, so we can delete right after id
  res.status(201).send(project);
});

// Update Project data
projectApp.put('/', async (req, res) => {
  const project = req.body;
  await db.collection('projects').doc(project.id).update(project);

  res.status(200).send(project);
});

// Delete selected data from firestore
projectApp.delete('/:id', async (req, res) => {
  await db.collection('projects').doc(req.params.id).delete();

  res.status(200).send();
})

exports.projectApi = functions.https.onRequest(projectApp);
