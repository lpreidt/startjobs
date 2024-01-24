// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmCJLHINR0RQOV6f_kWJXQEF0Nkm5OCLY",
  authDomain: "startjobs-b6022.firebaseapp.com",
  projectId: "startjobs-b6022",
  storageBucket: "startjobs-b6022.appspot.com",
  messagingSenderId: "648037160330",
  appId: "1:648037160330:web:129d5e9c80b56b35b36473",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
