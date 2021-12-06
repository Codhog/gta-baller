import React, {memo, useContext} from 'react';
import {useObject} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {database} from "../firebase";
import {AuthContext} from "../../index";
const GroupChat = (props) => {
    const {court} = props

    const [snapshot] = useObject(ref(database, 'groupChat/'+court));
    return (
        <ul>
            {snapshot && console.log(snapshot.val())}
            {snapshot && !(snapshot.val() == undefined) ?
                snapshot.val()
                    .chatHistory
                    .map((values, i) => <MessageEach key={i} {...values} />)

                :<></>
            }
        </ul>
    );
};
// The updates to context values doesn't trigger re-render for all the children of the
// provider, rather only components that are rendered from within the Consumer
const MessageEach = memo(function MessageEach(props){
    const time = "上午8:45:25";
    console.log(props)
    const {avatar, text, uid} = props
    const AuthValue = useContext(AuthContext)
    const ClassName = AuthValue.uid===uid?"sent-text-lis":"messages-text-lis"
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