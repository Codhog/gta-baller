import React, {useEffect, useState} from 'react';
// import { signInAnonymously } from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";
import {auth} from '../firebase'
import {Form, Input, Button, Checkbox} from 'antd';
import GoogleLoginButton from '../../imgs/GoogleLogin.png'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/UserAuthContext";

// console.log(GoogleLoginButton)
const provider = new GoogleAuthProvider();
const LoginPage = () => {
    const navigate = useNavigate()
    const { googleLogin } = useAuth()
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleGoogleLogin = async () =>{
        try{
            await googleLogin()
            navigate('/')
        } catch{
            console.log('Login Error')
        }
    }

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
                        <img className="clickable" src={GoogleLoginButton} alt='googlelogin' onClick={handleGoogleLogin}/>

                    </Form.Item>

                </Form>
            </div>
        </>


    );
};



export default LoginPage