import MessageList from "../MessageList";
import {Button, Tooltip} from "antd";


import React from 'react';




function Chat(props) {
    return (
        <>
            <Header style={{backgroundColor: "white"}}>与{props.friendName}聊天中
            在线</Header>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <MessageList myInput={chatinput}/>
            </Content>
            <Footer style={{textAlign: "center"}}>
                <input
                    className="chat-input"
                    onChange={(e) => handleInput(e.target.value)}
                    placeholder="请输入文字">

                </input>
                <Tooltip title="发送">
                    <Button
                        type="primary"
                        id="chat-send"
                        style={{margin: 20}}
                        disabled={chatinput.length < 1}
                        onClick={sendChat()}
                    >
                        发送
                    </Button>

                </Tooltip>
            </Footer></>
    );
}

export default Chat;