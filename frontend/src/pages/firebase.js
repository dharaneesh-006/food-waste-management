// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD3WAHECteptEPolCpdc5onNKmJ1ZWpuI",
  authDomain: "community-meals.firebaseapp.com",
  projectId: "community-meals",
  storageBucket: "community-meals.appspot.com",
  messagingSenderId: "405667354055",
  appId: "1:405667354055:web:03358f9679c934ab23f5e2",
  measurementId: "G-FLYHLSFC4G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);