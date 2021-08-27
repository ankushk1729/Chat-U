import firebase from "firebase";
import 'firebase/auth';

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;


firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "chat-app-d1961.firebaseapp.com",
    projectId: "chat-app-d1961",
    storageBucket: "chat-app-d1961.appspot.com",
    messagingSenderId: "233003422105",
    appId: process.env.REACT_APP_APP_ID,
});

const provider = new firebase.auth.GoogleAuthProvider()

const db = firebase.firestore()

export {firebase,provider,db,arrayUnion,arrayRemove}