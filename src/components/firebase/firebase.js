import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyD4FvzxtJwZv30Gm7_FQFMU9IysWtdL3sg",
  authDomain: "lucif-store.firebaseapp.com",
  databaseURL: "https://lucif-store.firebaseio.com",
  projectId: "lucif-store",
  storageBucket: "lucif-store.appspot.com",
  messagingSenderId: "714901743214",
  appId: "1:714901743214:web:42cfe7541168c02507687f",
  measurementId: "G-CECEYLTG4Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage().ref();
