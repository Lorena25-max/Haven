import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-s5o6ZRcJnUiwtCL4W4D3OFJYYqZE6ps",
  authDomain: "haven-app-183f7.firebaseapp.com",
  projectId: "haven-app-183f7",
  storageBucket: "haven-app-183f7.firebasestorage.app",
  messagingSenderId: "122087835831",
  appId: "1:122087835831:web:958a158fe47d7aa9a52532",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);