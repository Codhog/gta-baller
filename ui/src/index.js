import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import Main from "./components/Main";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loginpic from './imgs/login.png';
import './styles/Login.scss'

export const AuthContext = React.createContext('')

// const DatabaseValue = () => {
//     const [snapshot, loading, error] = useObject(ref(database, 'courtInfo/'));
//
//     return (
//         <div>
//             <p>
//                 {error && <strong>Error: {error}</strong>}
//                 {loading && <span>Value: Loading...</span>}
//                 {snapshot && <span>Value: {snapshot.val()}</span>}
//             </p>
//         </div>
//     );
// };
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
            })
            .catch((error) => {
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
                <Main userName={user} />
            </AuthContext.Provider>
            :
            (
                <div onClick={signIn} className='login-button'>
                    <img src={Loginpic}  alt='Login with Google'/>
                </div>

            )




    );
}
ReactDOM.render(<Login />, document.getElementById("root"));
