import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyAjCxpjZuO4kx4H1bOdtMeKsxMD94MwNXA",
    authDomain: "spareactchallenge.firebaseapp.com",
    databaseURL: "https://spareactchallenge.firebaseio.com",
    projectId: "spareactchallenge",
    storageBucket: "spareactchallenge.appspot.com",
    messagingSenderId: "530724985546",
    appId: "1:530724985546:web:4bf2a1395929b887e97233",
    measurementId: "G-ZFR3WSSVR9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;