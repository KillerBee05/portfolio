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
