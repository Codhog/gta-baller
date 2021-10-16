import React, {useState} from "react";
import "antd/dist/antd.css";
import webSocket from 'socket.io-client'
import Window from "./Window";
import vchatlogo from "../imgs/vchat.png";
import axios from "axios";
// import firebase from "./firebase";
import {Layout, Menu, Button} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {DataContext} from "./Main1";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const Main = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const [tab, setTab] = useState(0)
    const username = props.userName

    const onCollapse = collapsed =>{
        setCollapsed(collapsed)

    }
    const handleCLicked = (num) => {
        switch (num){
            case 1:
                setTab(1)
                break;
        }
    }
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <img className="logo" alt="" src={vchatlogo}/>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={()=>handleCLicked(1)}>
                        Players Map
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        My Player
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined/>} title="User">

                        {/*<Menu.Item*/}
                        {/*    key={key + 3}*/}
                        {/*    title={obj.friendName}*/}
                        {/*    onClick={() => this.handleChatClick(obj.room)}*/}
                        {/*>*/}
                        {/*    {obj.friendName}*/}
                        {/*</Menu.Item>*/}

                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                        <Menu.Item key="80">Team 1</Menu.Item>
                        <Menu.Item key="81">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="82" icon={<FileOutlined/>}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/*<Header className="site-layout-background" style={{padding: 0}}/>*/}
                    {/*<DataContext.Provider ></DataContext.Provider>*/}
                        <Window tabNum={tab} username={username} />



                <Footer style={{textAlign: "center"}}>
                    VChat ©2021 Created by Codhog
                </Footer>
            </Layout>
        </Layout>
    );
}
export default Main