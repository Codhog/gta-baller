import React, {useContext, useEffect, useState} from "react";
import "antd/dist/antd.css";
import Window from "./Window";

// css
import {Layout, Menu, Button} from "antd";
import vchatlogo from "../imgs/gtaballerlogo.png";
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
} from "@ant-design/icons";


import Modal from "antd/es/modal/Modal";

const {Footer, Sider, Header} = Layout;

const {SubMenu} = Menu;

// 在此查詢用戶是否有加入群組， 加入了哪些群組
const LoginApp = (props) => {
    const {user, googleLogin: handleGoogleLogin} = props
    //Slider Collapsed
    const [collapsed, setCollapsed] = useState(false)


    const [signedIn, isSignedIn] = React.useState(false);
    const [tab, setTab] = useState(1)
    const [court, setCourt] = useState(0)

    // const [user, loading, error] = useAuthState(auth);
    // const [groups] = useObjectVal(ref(database, 'userGroups/'+user.uid));


    // const
    const onCollapse = collapsed =>{
        setCollapsed(collapsed)

    }
    const handleChatClick = (tabNum, courtID) =>{
        setTab(4)
        setCourt(courtID)
    }



    const LoggedInLayout = () =>{
        return (
            <Layout style={{minHeight: "100vh"}}>

                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <img className="logo" alt="" src={vchatlogo}/>
                    <Menu theme="dark"  mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={()=>setTab(1)}>
                            Players Map
                        </Menu.Item>

                        <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={()=>setTab(3)} >
                            Talk to Admin
                        </Menu.Item>

                        {/* 分离 是否等陆 的逻辑*/}

                            <SubMenu key="sub1" icon={<TeamOutlined/>} title="Local Groups Chat">
                                {/*{groups && console.log(groups)}*/}
                                {/*{snapshot && snapshot.val().map((val, ind)=>console.log(val, ind))}*/}
                                {/*{Object.values(groups).map(*/}
                                {/*    (val,ind)=><Menu.Item key={'subgroup'+ind}*/}
                                {/*                          onClick={()=>handleChatClick(4, val.cid)}>*/}
                                {/*        {val.court}</Menu.Item>)}*/}

                            </SubMenu>


                    </Menu>
                </Sider>

                <Layout className="site-layout">
                    <Header style={{textAlign: "right"}}>
                            <span className='Header-Sign-In' >Welcome, {user}</span>
                        </Header>

                    {/*  court means 0 , 1, 2 courtID*/}
                    <Window tabNum={tab} roomNum={court} />

                    <Footer style={{textAlign: "center"}}>
                        GTA-Baller ©2021 Created by Codhog
                    </Footer>
                </Layout>
            </Layout>
        );
    }

    const NotLoggedInLayout = () =>{
        return (
            // <Layout style={{minHeight: "100vh"}}>


        <>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <img className="logo" alt="" src={vchatlogo}/>
                <Menu theme="dark"  mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={()=>setTab(1)}>
                        Players Map
                    </Menu.Item>

                    <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={()=>setTab(3)} >
                        Talk to Admin
                    </Menu.Item>
                    {/* 分离 是否等陆 的逻辑*/}
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Local Groups Chat">
                        <LoginModal googleLoginFunc={handleGoogleLogin}/>
                    </SubMenu>

                </Menu>
            </Sider>

            <Layout className="site-layout">

                <Header style={{textAlign: "right"}}>
                    <a className='Header-Sign-In' onClick={handleGoogleLogin}>Sign in/Register</a>
                </Header>

                {/*  court means 0 , 1, 2 courtID*/}
                <Window tabNum={tab} roomNum={court} />

                <Footer style={{textAlign: "center"}}>
                    GTA-Baller ©2021 Created by Codhog
                </Footer>
            </Layout>
        </>
            // </Layout>
        );
    }


    return (<NotLoggedInLayout />);


}

const LoginModal = (props) =>{
    //Modal Visible
    const {googleLoginFunc} = props
    const [visible, setVisible] = React.useState(false);
    const signInModalOpen = () =>{
        setVisible(true);
    }

    const signInModalCancel = () =>{
        setVisible(false);
    }
    const signInModalOk = () =>{
        setVisible(false);
    }
    return (
        <>
            <Menu.Item key="80" mode="inline" onClick={signInModalOpen}>Please sign in to use Chat
            </Menu.Item>
            <Modal
                title="Sign In"
                visible={visible}
                onOk={signInModalOk}
                // confirmLoading={confirmLoading}
                onCancel={signInModalCancel}
                footer={[
                    <Button key="back" onClick={signInModalCancel}>
                        Return
                    </Button>,
                    // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                    //     Submit
                    // </Button>,
                    <Button
                        key="link"
                        // href="https://google.com"
                        type="primary"
                        // loading={loading}
                        onClick={googleLoginFunc}
                    >
                        Search on Google
                    </Button>,
                ]}
            >
            </Modal>
        </>

    )
}

export default LoginApp