// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnCE4DIcTI3ACxwtqkAvdo9qxHT2Uzusc",
  authDomain: "clone-b2848.firebaseapp.com",
  projectId: "clone-b2848",
  storageBucket: "clone-b2848.appspot.com", // FIXED
  messagingSenderId: "93992136899",
  appId: "1:93992136899:web:ec74602a6968f01175b276",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
