import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import Main from "./components/Main";
// import {socket} from "./components/socket";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {initializeApp} from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDlBFrUTOF7J6NvJlqeABSdtYKOr4qgiXs",
//     authDomain: "gta-baller.firebaseapp.com",
//     projectId: "gta-baller",
//     storageBucket: "gta-baller.appspot.com",
//     messagingSenderId: "184696766878",
//     appId: "1:184696766878:web:af690da82b49bf3a2c968f",
//     measurementId: "G-QZ685H3BSB"
// }
// const app = initializeApp(firebaseConfig);
const Login = () => {
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const signIn = () => {


        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(`user:${user} `)
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            console.log(`出错了${errorMessage}`)
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        // user.displayName
    }
    return (
        user ? <Main userName={user}/> : <form>
            <button type="primary" style={{margin: 20}} onClick={signIn}>
                登录
            </button>
        </form>

    );
}
ReactDOM.render(<Login/>, document.getElementById("root"));
