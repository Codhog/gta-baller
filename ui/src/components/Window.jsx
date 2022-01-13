import React, {useEffect} from "react";
// import MessageList from "./MessageList";
import Map from "./Map/Map";
import AIChat from "./Chat/AIChat";
import {Content, Header} from "antd/es/layout/layout";
import { ref, getDatabase } from 'firebase/database';
import {useObject} from "react-firebase-hooks/database";
import {database} from "./firebase";
import GroupChat from "./Chat/GroupChat";


const Window = (props) => {
    const {roomNum, tabNum} = props
    const [snapshot, loading, error] = useObject(ref(database, 'courtInfo/'));
    // SELECTED component 可以指选择的几个框 ‘欢迎使用’  ‘ 球员地图 ’等

    const selectedComponent = () => {
        // console.log('tabnum', props.tabNum)
        switch (props.tabNum) {
            case 0:
                return  <div>
                    <p>
                        {error && <strong>Error: {error}</strong>}
                        {loading && <span>Value: Loading...</span>}
                        {snapshot &&   console.log(snapshot.val())  }
                    </p>
                </div>
            case 1:
                return <Map />
            case 3:
                return <AIChat />
            case 4:
                return <GroupChat room={roomNum}/>
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
