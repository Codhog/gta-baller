import React from "react";
// import MessageList from "./MessageList";
import Map from "./Map/Map";
import AIChat from "./Chat/AIChat";
import {Content, Header} from "antd/es/layout/layout";


const Window = (props) => {


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
                return <AIChat />
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
