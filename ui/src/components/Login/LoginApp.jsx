import React, {useContext, useEffect, useState} from "react";
import "antd/dist/antd.css";
import Window from "../Window";
// css
import {Layout, Menu, Button} from "antd";
import vchatlogo from "../../imgs/gtaballerlogo.png";
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import {Footer, Header} from "antd/es/layout/layout";
import {useList, useListVals, useObjectVal} from "react-firebase-hooks/database";
import {database, auth} from "../firebase";
import {getDatabase, ref} from "firebase/database";
import {useAuth} from "../../context/UserAuthContext";
const {Sider} = Layout;
const {SubMenu} = Menu;

// 在此查詢用戶是否有加入群組， 加入了哪些群組
const LoginApp = () => {
    const { currentUser, logOut } = useAuth()
    const {displayName:username, uid, photoURL:avatar} = currentUser
    //Slider Collapsed
    const [collapsed, setCollapsed] = useState(false)


    const [tab, setTab] = useState(1)
    const [court, setCourt] = useState(0)

    const [groups, loading, error] = useListVals(ref(database, 'userGroups/'+ uid));

    const onCollapse = collapsed =>{
        setCollapsed(collapsed)
    }


    const handleChatClick = (tabNum, courtID) =>{
        setTab(4)
        setCourt(courtID)
    }

        return (
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

                        <SubMenu key="sub1" icon={<TeamOutlined/>} title="Local Groups Chat">
                            {error && <Menu.Item key='subgroupError1'>
                                {error}</Menu.Item>}
                            {loading && <Menu.Item key='subgroupError1'>
                                {loading}</Menu.Item>}

                            {!loading && groups && console.log(groups)}
                            {/*{snapshot && snapshot.val().map((val, ind)=>console.log(val, ind))}*/}
                            {!loading && groups && Object.values(groups).map(
                                (val,ind)=><Menu.Item key={'chat'+ind}
                                                      onClick={()=>handleChatClick(4, val.cid)}>
                                    {val.court}</Menu.Item>)}

                        </SubMenu>


                    </Menu>
                </Sider>

                <Layout className="site-layout">
                    <Header style={{textAlign: "right"}}>
                        {<span className='Header-Sign-In' >Welcome, {username}
                            <Button onClick={logOut}>Sign Out</Button>
                        </span>}

                    </Header>

                    {/*  court means 0 , 1, 2 courtID*/}
                    {/*<Window tabNum={1} roomNum={court} />*/}
                    <Window tabNum={tab}  roomNum={court}/>

                    <Footer style={{textAlign: "center"}}>
                        GTA-Baller ©2021 Created by Codhog
                    </Footer>
                </Layout>
            </>



        );

}

// const LoginModal = (props) =>{
//     //Modal Visible
//     const {googleLoginFunc} = props
//     const [visible, setVisible] = React.useState(false);
//     const signInModalOpen = () =>{
//         setVisible(true);
//     }
//
//     const signInModalCancel = () =>{
//         setVisible(false);
//     }
//     const signInModalOk = () =>{
//         setVisible(false);
//     }
//     return (
//         <>
//             <Menu.Item key="80" mode="inline" onClick={signInModalOpen}>Please sign in to use Chat
//             </Menu.Item>
//             <Modal
//                 title="Sign In"
//                 visible={visible}
//                 onOk={signInModalOk}
//                 // confirmLoading={confirmLoading}
//                 onCancel={signInModalCancel}
//                 footer={[
//                     <Button key="back" onClick={signInModalCancel}>
//                         Return
//                     </Button>,
//                     // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
//                     //     Submit
//                     // </Button>,
//                     <Button
//                         key="link"
//                         // href="https://google.com"
//                         type="primary"
//                         // loading={loading}
//                         onClick={googleLoginFunc}
//                     >
//                         Search on Google
//                     </Button>,
//                 ]}
//             >
//             </Modal>
//         </>
//
//     )
// }

export default LoginApp