import React, {useEffect, useState} from 'react';
// import { signInAnonymously } from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";
import {auth} from './firebase'
import {Form, Input, Button, Checkbox} from 'antd';
import GoogleLoginButton from '../imgs/GoogleLogin.png'
import {Link, useNavigate} from "react-router-dom";

// console.log(GoogleLoginButton)
const provider = new GoogleAuthProvider();
const LoginPage = (props) => {
    const {user, handleSetUser} = props
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const anonymousLogin = () =>{
    //     signInAnonymously(auth)
    //         .then((res) => {
    //             // Signed in..
    //             console.log(res)
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // ...
    //         });
    // }

    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                // const user = result.user;
                handleSetUser(result)
                console.log(result)

                // setUser()
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user && navigate('/')
            return unsubscribe
        });
    }, [])

    return (
        <>
            <Link
                style={{
                    position: 'absolute', left: '30%', top: '20%',
                    transform: 'translate(-28%, -28%)',
                }}
                to="/" >go back</Link>

            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-48%, -48%)'
                }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Log in with account
                        </Button>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="remember"*/}
                    {/*    valuePropName="checked"*/}
                    {/*    wrapperCol={{*/}
                    {/*        offset: 8,*/}
                    {/*        span: 16,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Button type="primary"  onClick={anonymousLogin}>*/}
                    {/*        Log in anonymously*/}
                    {/*    </Button>*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <img className="picture-button" src={GoogleLoginButton} alt='googlelogin' onClick={googleLogin}/>

                    </Form.Item>

                </Form>
            </div>
        </>


    );
};



export default LoginPage