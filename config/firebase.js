// config/firebase.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW5g2e3GtuOAf1-IXxvv7PEr8zQItDawg",
  authDomain: "i-am-clingy.firebaseapp.com",
  projectId: "i-am-clingy",
  storageBucket: "i-am-clingy.firebasestorage.app",
  messagingSenderId: "157728959077",
  appId: "1:157728959077:web:6489407304f8940c0ff48c",
  measurementId: "G-ZJ9CH4B9VZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});



export default app;

