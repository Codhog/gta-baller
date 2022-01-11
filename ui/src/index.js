import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import LoginApp from "./components/LoginApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "./components/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loginpic from './imgs/login.png';
import './styles/Login.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Layout, {Footer, Header} from "antd/es/layout/layout";
import NoLoginApp from "./components/NoLoginApp";
import Window from "./components/Window";


const App = () => {

    const [user, setUser] = useState(null)
    const GoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                const res = {'user':result.user, 'res': result};
                console.log(`user:${user} `)
                return res
            })
            .then(({user,res})=>{
                setUser(user)
                console.log(res)
            })
            .catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.email;
                console.log(`出错了${errorMessage}`)
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return(
        <Layout style={{minHeight: "100vh"}}>
            {/*{user?}*/}
            <NoLoginApp />

            <Layout className="site-layout">

                <Header style={{textAlign: "right"}}>
                    <a className='Header-Sign-In' >Sign in/Register</a>
                </Header>

                {/*  court means 0 , 1, 2 courtID*/}
                {/*<Window tabNum={1} roomNum={court} />*/}
                <Window tabNum={1}  />

                <Footer style={{textAlign: "center"}}>
                    GTA-Baller ©2021 Created by Codhog
                </Footer>
            </Layout>
        </Layout>

        );
}
ReactDOM.render(<App />, document.getElementById("root"));
