import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDb2ag6LLlWe4KHv55i8aLEgVlWbyzBbnI",
  authDomain: "galaxy-interior.firebaseapp.com",
  databaseURL: "https://galaxy-interior-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "galaxy-interior",
  storageBucket: "galaxy-interior.firebasestorage.app",
  messagingSenderId: "230292492490",
  appId: "1:230292492490:web:6dce7f3b67865286be6433",
  measurementId: "G-VL9CFXR81T"
};

// Initialize Firebase (prevent re-initializing in Next.js development)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
