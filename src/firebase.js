import * as firebase from 'firebase';
import { auth } from 'firebase';

const config = {
    apiKey: "AIzaSyBGougay1DF4mPNV0TLL5fN2aW1GVpx6M8",
    authDomain: "online-tests-app.firebaseapp.com",
    databaseURL: "https://online-tests-app.firebaseio.com/",
    projectId: "online-tests-app",
    storageBucket: "online-tests-app.appspot.com",
    messagingSenderId: "241730240071",
    appId: "1:241730240071:web:41bf707fb06da052e5bb62",
    measurementId: "G-9685504SE6"
};

firebase.initializeApp(config);
const fbDB = firebase.database()

const googleAuth = new auth.GoogleAuthProvider();

export {
    fbDB,
    googleAuth,
    
};