import React, {Component, useState} from "react";
import {Layout, Button, Tooltip} from "antd";
import MessageList from "./MessageList";
import Map from "./Map/Map";

const {Header, Content, Footer} = Layout;

const Window = (props) => {


    const [chatinput, setChatinput] = useState('')

    const handleInput = (inputValue) => {
        if (inputValue.length < 1) {
            setChatinput('')
        } else {
            setChatinput(inputValue)
        }
    }

    const sendChat = () => {
        // 获取 谷歌 用户 数据 头像
    }
    // SELECTED component 可以指选择的几个框 ‘欢迎使用’  ‘ 球员地图 ’等
    const selectedComponent = () => {
        console.log('tabnum', props.tabNum)
        switch (props.tabNum) {
            case 0:
                return <>
                    <Header style={{backgroundColor: "white"}}>欢迎使用</Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                    </Content>
                </>
            case 1:
                return <Map />
            case 3:
                return
            default:
                return <>
                    <Header style={{backgroundColor: "white"}}>Loading...</Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                    </Content>
                </>
        }

    }

    return (
        selectedComponent()


    );

}

export default Window;
