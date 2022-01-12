import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import LoginApp from "./components/LoginApp";
import './styles/Login.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Layout, {Footer, Header} from "antd/es/layout/layout";
import NoLoginApp from "./components/NoLoginApp";
import Window from "./components/Window";
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './components/firebase'

const App = () =>{
    const [user, setUser] = useState(null)
    const handleSetUser = ({displayName, uid, photoURL}) =>{
        setUser({
            'username':displayName,
            'uid':uid,
            'avatar': photoURL
        })
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log(user)
                handleSetUser(user)
                // ...
            } else {
                // User is signed out
                setUser(null)
            }
            return unsubscribe
        });
    }, [])
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main user={user}/>} />
                <Route path="/login" element={<LoginPage setUser={handleSetUser} user={user}/>} />
            </Routes>
        </HashRouter>
    );

}

const Main = (props) => {

    const user = props.user

    return(
        <Layout style={{minHeight: "100vh"}}>
            {user&&user?<LoginApp user={user}/>:<NoLoginApp />}
            <Layout className="site-layout">
                <Header style={{textAlign: "right"}}>
                    {user&&user?<span className='Header-Sign-In' >Welcome, {user['username']}</span>:
                        <Link to="/login" >Sign in/Register</Link>}
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
