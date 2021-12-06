import React, {useContext} from 'react';
import MessageEach from './MessageList'
import {useObject} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {database} from "../firebase";
import {AuthContext} from "../../index";
const GroupChat = (props) => {
    const {court} = props
    const AuthValue = useContext(AuthContext)
    const [snapshot] = useObject(ref(database, 'groupChat/'+court));
    return (
        <ul>
            {snapshot && console.log(snapshot.val())}
            {snapshot && !(snapshot.val() == undefined) ? snapshot.val().chatHistory.map((values, i) => <MessageEach key={i} {...values} />)

                :<></>
            }
        </ul>
    );
};

export default GroupChat;