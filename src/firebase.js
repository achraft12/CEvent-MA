// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOPuv0an2g_HllLzofXW0n6HnD4eALKCU",
  authDomain: "project1-5f108.firebaseapp.com",
  projectId: "project1-5f108",
  storageBucket: "project1-5f108.firebasestorage.app",
  messagingSenderId: "777256763394",
  appId: "1:777256763394:web:40977fd07cfa60116ba71b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export these!
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
