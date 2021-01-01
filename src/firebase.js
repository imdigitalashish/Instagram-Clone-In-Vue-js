import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: '<api-key>',
    authDomain: "instagram-cone-ed3ea.firebaseapp.com",
    projectId: "instagram-cone-ed3ea",
    storageBucket: "instagram-cone-ed3ea.appspot.com",
    messagingSenderId: "<messagin-id>",
    appId: "1:409854610021:web:49e54e65e6ac97c427548c",
    measurementId: "G-VQXHSZD0N2"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db, auth, storage};
