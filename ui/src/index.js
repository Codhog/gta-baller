import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import LoginApp from "./components/LoginApp";
import './styles/Login.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Layout, {Footer, Header} from "antd/es/layout/layout";
import NoLoginApp from "./components/NoLoginApp";
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './components/firebase'
import {createContext} from "react";
import {AuthProvider, useAuth} from "./components/UserAuthContext";

export const AuthContext = createContext({});

const App = () =>{
    // const [user, setUser] = useState(null)
    // const handleSetUser = ({displayName, uid, photoURL}) =>{
    //     setUser({
    //         'username':displayName,
    //         'uid':uid,
    //         'avatar': photoURL
    //     })
    // }
    // onAuthStateChanged(auth, (user) => {
    //     // if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     // console.log(user)
    //     handleSetUser(user)
    //     // ...
    //     // }
    //     user?handleSetUser(user):setUser(null)
    //     // else{
    //     //     setUser(null)
    //     // }
    //     // Shouldn't unsubscribe if 其他组件要使用监听
    //     // return () => unsubscribe()
    // });
    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         // if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             // console.log(user)
    //             handleSetUser(user)
    //             // ...
    //         // }
    //         user?handleSetUser(user):setUser(null)
    //         // else{
    //         //     setUser(null)
    //         // }
    //         // Shouldn't unsubscribe if 其他组件要使用监听
    //         // return () => unsubscribe()
    //     });
    // }, [])
    return (
        <HashRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </HashRouter>
    );

}

const Main = () => {
    const { currentUser } = useAuth()
    // const [user, setUser] = useState({
    //     'username':'123',
    //     'uid':'123',
    //     'avatar': '123'
    // })
    // // setUser()
    // const handleSetUser = ({displayName, uid, photoURL}) =>{
    //     setUser({
    //         'username':displayName,
    //         'uid':uid,
    //         'avatar': photoURL
    //     })
    // }
    // const user = props.user
    // onAuthStateChanged(auth, (user) => {
    //     // if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     // console.log(user)
    //     handleSetUser(user)
    //     // ...
    //     // }
    //     user?handleSetUser(user):setUser(null)
    //     // else{
    //     //     setUser(null)
    //     // }
    //     // Shouldn't unsubscribe if 其他组件要使用监听
    //     // return () => unsubscribe()
    // });
    return(
        <Layout style={{minHeight: "100vh"}}>
            {currentUser&&console.log(currentUser)}
            {currentUser&&currentUser?
                    <LoginApp />
                :<NoLoginApp />}


        </Layout>

        );
}
ReactDOM.render(<App />, document.getElementById("root"));
