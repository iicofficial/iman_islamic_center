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

console.group("Firebase Configuration Check");
console.log("Project ID:", firebaseConfig.projectId);
requiredKeys.forEach(key => {
    const value = import.meta.env[key];
    if (value) {
        // Show first 4 characters to confirm it's a real key (e.g. AIza...)
        console.log(`${key}: ✅ [${value.substring(0, 4)}...${value.substring(value.length - 4)}]`);
    } else {
        console.log(`${key}: ❌ MISSING`);
    }
});
console.log("Auth Domain:", firebaseConfig.authDomain);
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "undefined") {
    console.error("CRITICAL: Firebase API Key is missing or string 'undefined'!");
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
