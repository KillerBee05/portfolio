//Express
const express = require('express');
const authApp = express();
// Cors
const cors = require('cors')
authApp.use(cors({ origin: true}));
// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-7ed56-default-rtdb.firebaseio.com"
});
const dbAdmin = admin.auth();
const dbStore = admin.firestore();
// Auth Middleware
const authMiddleware = require('./authMiddleware');

// Sign in
authApp.post('/signIn', async (req, res) => {
  const user = req.body;

  dbAdmin.signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

});

// Sign Up
authApp.post('/signUp', async (req, res) => {
  const user = req.body;
  dbAdmin.createUser({
    email: user.email,
    password: user.password
  })
  .then(function(user) {
      // Create user collection
      dbStore.collection('users').doc(user.uid).collection('account').add({
        email: user.email
      });
      // Send success details back
      res.status(200).send(JSON.stringify("Successfully created new user:", user.email))
  })
  .catch(function(error) {
      // Send error details back
      res.status(400).send(JSON.stringify(error.message))
  });
});

// Fetch session from firestore
authApp.get('/sessionDetails', authMiddleware, async (req, res) => {
  let userId = res.req.user.uid
  // console.log(res.req.user.uid)
  res.status(200).send(JSON.stringify({"userId": userId}));

  // res.status(200).send(JSON.stringify("Successfully checked session"));
});


exports.authApi = functions.https.onRequest(authApp);
