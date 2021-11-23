import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import Main from "./components/Main";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth';

export const AuthContext = React.createContext('')

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
        user ?
            <AuthContext.Provider value={user}>
                <Main userName={user}/>
            </AuthContext.Provider>
             : <form>
            <button type="primary" style={{margin: 20}} onClick={signIn}>
                登录
            </button>
        </form>

    );
}
ReactDOM.render(<Login/>, document.getElementById("root"));
