const { initializeApp } = require('firebase-admin/app');
var serviceAccount = require('../serviceAccountKey.json');
var admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

const app = initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = getStorage().bucket();

export { bucket, app, db };
