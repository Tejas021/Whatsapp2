// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {GoogleAuthProvider,getAuth} from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnFl0IWbIMC05Z91X_GbxWr1A3qx_Lo5I",
  authDomain: "whatsapp2-af958.firebaseapp.com",
  projectId: "whatsapp2-af958",
  storageBucket: "whatsapp2-af958.appspot.com",
  messagingSenderId: "261278230316",
  appId: "1:261278230316:web:d014c90a6b9e70ef72ee89",
  measurementId: "G-B4Z5PRWWEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db  = getFirestore(app)
const auth  = getAuth(app)
const provider = new GoogleAuthProvider();

export {db,auth,provider}