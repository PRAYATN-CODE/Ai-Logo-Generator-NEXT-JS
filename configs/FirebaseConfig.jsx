// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_ZRWUFE_K5FPZ1KvXxZfc3ZAOCFicYO8",
    authDomain: "ai-logo-generator-2a851.firebaseapp.com",
    projectId: "ai-logo-generator-2a851",
    storageBucket: "ai-logo-generator-2a851.firebasestorage.app",
    messagingSenderId: "762448586192",
    appId: "1:762448586192:web:4392c54a29bd53d3f005d5",
    measurementId: "G-KV9EJBECM0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
