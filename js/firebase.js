// ─────────────────────────────────────────────
//  firebase.js  —  GauVardhan Feed
//  Shared Firebase connection used by all pages
//  LEARNING: This file initialises Firebase once.
//  Every other JS file that needs the database
//  just imports `db` from here.
// ─────────────────────────────────────────────

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoByjP9G0_YUVld2xrdQInIhgcE4n8CUc",
  authDomain: "gauvardhan-feed.firebaseapp.com",
  projectId: "gauvardhan-feed",
  storageBucket: "gauvardhan-feed.firebasestorage.app",
  messagingSenderId: "259963755977",
  appId: "1:259963755977:web:5bdf31d9a8885d9b949c18"
};

// Initialise Firebase app
const app = initializeApp(firebaseConfig);

// Initialise Firestore database and export it
// LEARNING: `db` is your database object. You pass it
// to functions like addDoc(), getDocs() etc.
export const db = getFirestore(app);
