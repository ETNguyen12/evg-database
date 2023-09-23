import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBW7UYXjRoff5AH6raLkgp-xi7Z7Val6aA",
  authDomain: "evg-database-64a72.firebaseapp.com",
  projectId: "evg-database-64a72",
  storageBucket: "evg-database-64a72.appspot.com",
  messagingSenderId: "654622325916",
  appId: "1:654622325916:web:09e5fed1cfd11ed054c159"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();