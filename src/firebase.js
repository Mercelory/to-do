// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE5I9fPGgdU6l505n9H8rDgtkBKo5AKRU",
  authDomain: "mercelory-63467.firebaseapp.com",
  databaseURL: "https://mercelory-63467-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mercelory-63467",
  storageBucket: "mercelory-63467.appspot.com",
  messagingSenderId: "835031562371",
  appId: "1:835031562371:web:e2fbd60d8cb711165783b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app)