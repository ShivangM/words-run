// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDVj57bxEkjpkggkzzqwU4A7iAQn7WcOOM',
  authDomain: 'words-run.firebaseapp.com',
  projectId: 'words-run',
  storageBucket: 'words-run.appspot.com',
  messagingSenderId: '482029790499',
  appId: '1:482029790499:web:719fff011aa6aa9f7b5896',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export { provider, auth, app };
