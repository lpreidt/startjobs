// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
