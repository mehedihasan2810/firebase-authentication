// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvnzfsQc8iGARQkmkGuxe0dqt58nKsqzI",
  authDomain: "fir-authentication-94ad2.firebaseapp.com",
  projectId: "fir-authentication-94ad2",
  storageBucket: "fir-authentication-94ad2.appspot.com",
  messagingSenderId: "795423010812",
  appId: "1:795423010812:web:feae5f3594307d2fb70c79",
  measurementId: "G-34V0V0GCCF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;


