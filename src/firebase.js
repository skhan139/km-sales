// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrH9Eg1j-n7vd_ItHuoEjm_oSa6dO2hG4",
  authDomain: "kmsales-5aefe.firebaseapp.com",
  projectId: "kmsales-5aefe",
  storageBucket: "kmsales-5aefe.firebasestorage.app",
  messagingSenderId: "991672824921",
  appId: "1:991672824921:web:bcad51566a98c040cbad48",
  measurementId: "G-P95K4FJS51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);