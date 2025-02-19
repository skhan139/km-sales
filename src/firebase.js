import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBrH9Eg1j-n7vd_ItHuoEjm_oSa6dO2hG4',
  authDomain: 'kmsales-5aefe.firebaseapp.com',
  projectId: 'kmsales-5aefe',
  storageBucket: 'kmsales-5aefe.appspot.com',
  messagingSenderId: '991672824921',
  appId: '1:991672824921:web:6e5c66b772ac2120cbad48'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };