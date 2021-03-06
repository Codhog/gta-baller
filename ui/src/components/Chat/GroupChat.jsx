import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import {useList, useListVals, useObject} from "react-firebase-hooks/database";
import { getDatabase, ref, push, set } from "firebase/database";
import {database} from "../firebase";
import {Footer} from "antd/es/layout/layout";
import {Tooltip} from "antd";
import {Button} from "@chatui/core";
import {AuthContext} from "../../context/UserAuthContext";
const GroupChat = (props) => {
    const AuthValue = useContext(AuthContext);
    const court = props.room
    // console.log(AuthValue,court,'AuthValue')

    const [formValue, setFormValue] = useState('');
    const dummy = useRef();
    // const [snapshot] = useObject(ref(database, 'groupChat/'+court));
    const [chat, loading, error] = useListVals(ref(database, 'groupChat/'+court));
    const scrollToBottom = () => {
        dummy.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [chat]);

    const sendMessage = (e) =>{
        e.preventDefault();
        const {uid, photoURL} = AuthValue.currentUser
        console.log(uid, photoURL,'uid')
        const groupChatRef = ref(database, 'groupChat/'+court);
        const newChatRef = push(groupChatRef);
        set(newChatRef, {
                "avatar":photoURL,
                "uid": uid,
                "text": formValue
        })
        .catch((err)=>{
            console.log(err)
        });
        setFormValue('');

    }
    // {chatHistory: {…}, cid: 0, court: 'Aaniin'}
    // chatHistory:
    //     -MqEoDV8R-IuKXCwyTXr: Array(1)
    // 0: {avatar: 'https://lh3.googleusercontent.com/a-/AOh14GgKHDANjlnId9N3bH6pt2GXNrSu8CVCvNjgavCmNQ=s96-c', text: 'Hello Peter', uid: 'CyqBgzssphUrH2g96oD3oVpL7Dq1'}
    // length: 1
    //     [[Prototype]]: Array(0)
    //     [[Prototype]]: Object

    return (
        <>
            <ul className='chat-content'>
            {chat && console.log(chat)}
            {chat  ?
                chat

                    .map((values, i) => <MessageEach key={i} {...values} />)

                :<></>
            }
            {/*{chat && console.log(chat)}*/}
            {/*{chat && chat.chatHistory ?*/}
            {/*    Object.values(chat.chatHistory)*/}
            {/*    .map((values, i) => <MessageEach key={i} {...values} />)*/}
            {/*    :<></>*/}
            {/*}*/}
            <div ref={dummy}> </div>
        </ul>
            <Footer style={{ textAlign: "center" }}>
                <form onSubmit={sendMessage}>

                    <input className="chat-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                    <Tooltip title="send">
                        {!formValue ? (
                            <Button
                                type="submit"
                                id="chat-send"
                                style={{ margin: 20 }}
                                disabled={!formValue}
                            >
                                send
                            </Button>
                        ) : (
                            <Button type="primary" id="chat-send" style={{ margin: 20 }}>
                                send
                            </Button>
                        )}
                    </Tooltip>

                </form>

            </Footer>
        </>

    );
};
// The updates to context values doesn't trigger re-render for all the children of the
// provider, rather only components that are rendered from within the Consumer
const MessageEach = memo(function MessageEach(props){
    // const time = "上午8:45:25";
    // console.log(props)
    const {avatar, text, uid} = props
    const AuthValue = useContext(AuthContext)
    const ClassName = AuthValue.uid!==uid?"sent-text-lis":"messages-text-lis"



    return(
        <>
            <div className={ClassName}>
                {avatar&&<img alt='avatar' className='avatar' src={avatar} />}
                <p>{text}</p>
            </div>




        </>

    )
})
export default GroupChat;