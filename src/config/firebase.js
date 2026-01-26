import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug: Detailed Config Check
const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID'
];

console.group("Firebase Configuration Check - v1.0.2");
console.log("Project ID:", firebaseConfig.projectId);
requiredKeys.forEach(key => {
    const value = import.meta.env[key];
    if (value) {
        // Show enough of the key to distinguish it
        console.log(`${key}: ✅ [${value.substring(0, 6)}...${value.slice(-6)}]`);
    } else {
        console.log(`${key}: ❌ MISSING`);
    }
});
console.log("Full Auth Domain:", firebaseConfig.authDomain);
if (firebaseConfig.apiKey && firebaseConfig.apiKey.includes('Z4cA')) {
    console.error("ALERT: You are still using the OLD WRONG API KEY (ending in Z4cA). You must REDEPLOY on Vercel.");
}
console.groupEnd();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider to hint for the specific domain
googleProvider.setCustomParameters({
    hd: "iman-islam.org"
});

export { auth, googleProvider, db };
