//Express
const express = require('express');
const pdfApp = express();
// Cors
const cors = require('cors')
pdfApp.use(cors({ origin: true}));
// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const db = admin.firestore();
// Auth Middleware
const authMiddleware = require('./authMiddleware');

// Fetch data from firestore
pdfApp.get('/', async (req, res) => {
  const userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('resume').where('userId', '==', userId).get();

  let pdf = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    pdf.push({ id, ...data});
  });
  res.status(200).send(pdf);
});

// Fetch data from firestore
pdfApp.get('/auth', authMiddleware, async (req, res) => {
  let userId = res.req.user.uid;
  // const userId = res.req._parsedUrl.query;
  const snapshot = await db.collectionGroup('resume').where('userId', '==', userId).get();

  let pdf = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    pdf.push({ id, ...data});
  });
  res.status(200).send(pdf);
});

// Post data to firestore
pdfApp.post('/', authMiddleware, async (req, res) => {
  let userId = res.req.user.uid;
  const pdf = req.body;
  await db.collection('users').doc(userId).collection('resume').add({userId: userId, url: pdf.url})

  // await db.collection('resume').doc("pdf").set({
  //   userId: userId,
  //   url: pdf.url
  // })
  // TODO push id with data, so we can delete right after id
  res.status(201).send(pdf);
});


exports.pdfApi = functions.https.onRequest(pdfApp);
