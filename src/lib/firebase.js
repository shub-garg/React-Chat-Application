import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgw1vl8N7ZcJhok2QHSeSN6Ca0FidWZeo",
  authDomain: "reactchat-5ada2.firebaseapp.com",
  projectId: "reactchat-5ada2",
  storageBucket: "reactchat-5ada2.appspot.com",
  messagingSenderId: "265312937381",
  appId: "1:265312937381:web:7bf2e90162abea9bd7f44c",
  measurementId: "G-BWTWX28580"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()