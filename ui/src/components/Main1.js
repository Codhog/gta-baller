import React from "react";
import "antd/dist/antd.css";
import webSocket from 'socket.io-client'
import Window from "./Window";
import vchatlogo from "../imgs/vchat.png";
import axios from "axios";
import { Layout, Menu, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export const DataContext = React.createContext()

export default class SiderDemo extends React.Component {

  state = {
    isLoading: true,
    collapsed: false,
    roomid: -1,
    allChatHistory: null,
    selectedChat: null,
    talkingTab: 0,
    isTalking: false
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  handleChatClick = (roomID) => {
    // console.log(roomID);
    // const {allChatHistory} = this.state
    // // 从后台获取到所有含 本工号的聊天记录后
    // // 可推断含有朋友工号的聊天记录 是唯一的
    // let _thisChatHistory = allChatHistory.filter((obj)=>{
    //   return (obj.room.includes(roomID))
    // })
    // console.log('_thisChatHistory', _thisChatHistory);
    // this.setState({
    //   selectedChat: _thisChatHistory[0],
    //   isTalking: true
    //
    // })


  };

  fetchChatHistory = () =>{
    axios
    .get(`http://localhost:3030/api`, {
       crossdomain: true,
       params:{
         rid: this.props.username
       } 
    })
    .then((result) => {
      this.setState({
        isLoading: false,
        allChatHistory: result.data  ,
      });
    })
    .catch((error) => {
      console.log("Axios出现问题", error);
    });
  } 

  componentDidMount() {
    console.log(this.props.username);
    this.fetchChatHistory()

  }

  render() {
    const { collapsed, isLoading, allChatHistory, username, isTalking, selectedChat } = this.state;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <img className="logo" alt="" src={vchatlogo} />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Players Map
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              My Player
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">

              {isLoading ?
              <Menu.Item key="3" icon={<DesktopOutlined />}>Option 2</Menu.Item>
              : allChatHistory.map((obj, key) => {
                console.log(obj, key);
                return (
                  <Menu.Item
                    key={key + 3}
                    title={obj.friendName}
                    onClick={()=> this.handleChatClick(obj.room)}
                  >
                    {obj.friendName}
                  </Menu.Item>
                );})}

            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="80">Team 1</Menu.Item>
              <Menu.Item key="81">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="82" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          {isTalking?
          // <DataContext.Provider value={selectedChat.info}> </DataContext.Provider>
            <Window username={username} isTalking={true} friendName={selectedChat.friendName} />

          
            :
            <>
            <Header style={{ backgroundColor: "white" }}>欢迎使用</Header>
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
          
          <Footer style={{ textAlign: "center" }}>
            VChat ©2021 Created by Codhog
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
