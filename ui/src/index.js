import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import Main from "./components/Main";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {Row, Col, Button} from "antd";
import './styles/Login.scss'
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
                <Button type="primary" className='login-button' onClick={signIn}>
                     Log in with your Google Account
                    </Button>
            )
            // (
            //     <Row>
            //         <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                        
            //         </Col>
            //         <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            //         <Button type="primary" className='login-button' onClick={signIn}>
            //          Log in with your Google Account
            //         </Button>
            //         </Col>
            //         <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                        
            //         </Col>
            //     </Row>
                
            // )



    );
}
ReactDOM.render(<Login />, document.getElementById("root"));
