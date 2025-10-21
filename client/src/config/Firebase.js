// firebase.js

// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiaPn2kglhMkgh7PdV9uFTkI8TqCGKMRE",
  authDomain: "collab-peers.firebaseapp.com",
  projectId: "collab-peers",
  storageBucket: "collab-peers.firebasestorage.app",
  messagingSenderId: "677598562830",
  appId: "1:677598562830:web:adb5855641c8b06d500a5f",
  measurementId: "G-Y8QJZ97T52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);

export { app, db };
