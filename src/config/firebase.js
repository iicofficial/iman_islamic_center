import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCKSMMRnCsvVwDzt1DiVtr9zXVau9VMf5M",
    authDomain: "iman-islamic-center.firebaseapp.com",
    projectId: "iman-islamic-center",
    storageBucket: "iman-islamic-center.firebasestorage.app",
    messagingSenderId: "313930017571",
    appId: "1:313930017571:web:e397ea6674c6636ba8fa96",
    measurementId: "G-WJYWELMKHS"
};

// Debug: Detailed Config Check
console.group("Firebase Configuration Check - v1.0.4");
console.log("Project ID:", firebaseConfig.projectId);
Object.keys(firebaseConfig).forEach(key => {
    const value = firebaseConfig[key];
    if (value && typeof value === 'string') {
        console.log(`${key}: ✅ [${value.substring(0, 6)}...${value.slice(-6)}]`);
    }
});
console.log("Full Auth Domain:", firebaseConfig.authDomain);
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
