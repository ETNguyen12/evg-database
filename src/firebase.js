import firebase from "firebase/app";
import "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW7UYXjRoff5AH6raLkgp-xi7Z7Val6aA",
  authDomain: "evg-database-64a72.firebaseapp.com",
  projectId: "evg-database-64a72",
  storageBucket: "evg-database-64a72.appspot.com",
  messagingSenderId: "654622325916",
  appId: "1:654622325916:web:09e5fed1cfd11ed054c159"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default fireDb.database().ref();