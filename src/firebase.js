// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnQfxE3ub2BhXMUfXKrWFTz_knE66X9i0",
  authDomain: "suki-6bd72.firebaseapp.com",
  databaseURL:
    "https://suki-6bd72-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suki-6bd72",
  storageBucket: "suki-6bd72.appspot.com",
  messagingSenderId: "201153925394",
  appId: "1:201153925394:web:c498947d28c780da9da3cb",
  measurementId: "G-04298X4E57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
