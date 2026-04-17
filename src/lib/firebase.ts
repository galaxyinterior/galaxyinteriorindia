import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAffQCVsFBBFHNcAz05Lwg-OJak6Oqs8jM",
  authDomain: "studio-4927413196-b3f7b.firebaseapp.com",
  projectId: "studio-4927413196-b3f7b",
  storageBucket: "studio-4927413196-b3f7b.firebasestorage.app",
  messagingSenderId: "136822300940",
  appId: "1:136822300940:web:df938b4983ecd6599d2929"
};

// Initialize Firebase (prevent re-initializing in Next.js development)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
