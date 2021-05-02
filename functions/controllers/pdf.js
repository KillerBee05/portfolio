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
  const docRef = await db.collection('/resume').doc("pdf");

  docRef.get().then((doc) => {
    if (doc.exists) {
        const pdf = doc.data();
      res.status(200).send(pdf);
    } else {
      res.status(200).send(null);
    }
  })
});

// Post data to firestore
pdfApp.post('/', authMiddleware, async (req, res) => {
  const pdf = req.body;
  await db.collection('resume').doc("pdf").set({pdf})
  // TODO push id with data, so we can delete right after id
  res.status(201).send(pdf);
});


exports.pdfApi = functions.https.onRequest(pdfApp);
