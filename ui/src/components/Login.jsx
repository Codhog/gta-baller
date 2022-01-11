import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyDlBFrUTOF7J6NvJlqeABSdtYKOr4qgiXs",
    authDomain: "gta-baller.firebaseapp.com",
    databaseURL: "https://gta-baller-default-rtdb.firebaseio.com",
    projectId: "gta-baller",
    storageBucket: "gta-baller.appspot.com",
    messagingSenderId: "184696766878",
    appId: "1:184696766878:web:af690da82b49bf3a2c968f",
    measurementId: "G-QZ685H3BSB"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};

function SignInScreen() {
    return (
        <div>
            <h1>My App</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}

export default SignInScreen