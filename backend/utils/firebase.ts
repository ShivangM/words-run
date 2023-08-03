import { initializeApp } from 'firebase-admin/app'
import serviceAccount from '../serviceAccountKey.json'
import admin from 'firebase-admin'
import { getStorage } from 'firebase-admin/storage'

const app = initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})

const db = admin.firestore()
const bucket = getStorage().bucket()

export { bucket, app, db }
