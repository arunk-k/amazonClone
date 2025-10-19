// src/auth.js
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Email/password signup
export const signUp = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential;
};

// Email/password login
export const login = (email, password) => signInWithEmailAndPassword(auth, email);

// Google popup login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const token = await user.getIdToken();

  // Send token to backend
  const response = await fetch("http://localhost:5000/api/protected", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const userData = await response.json();
  return { user, userData };
};
