import React, {useContext, useEffect, useState} from "react";
import "antd/dist/antd.css";
import Window from "./Window";
import vchatlogo from "../imgs/gtaballerlogo.png";
import {ref, onValue, set} from "firebase/database";
import {useObjectVal} from 'react-firebase-hooks/database';
import {database} from "./firebase";
import {Layout, Menu, Button} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import {AuthContext} from '../index'
import GroupChat from "./Chat/GroupChat";

const {Footer, Sider} = Layout;
const {SubMenu} = Menu;
export const DataContext = React.createContext()
// 在此查詢用戶是否有加入群組， 加入了哪些群組
const Main = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const [tab, setTab] = useState(1)
    const [court, setCourt] = useState(0)
    const AuthValue = useContext(AuthContext)

    const [groups] = useObjectVal(ref(database, 'userGroups/'+AuthValue.uid));

    // useEffect(()=>{
    //     // onValue(ref(database, 'userGroups/'), (snapshot) => {
    //     //     const data = snapshot.val()
    //     //     console.log('截图', data)
    //     //     setGoNum(data)
    //     // });
    //     value && console.log(value, 'firehhook')
    // }, [])
    const onCollapse = collapsed =>{
        setCollapsed(collapsed)

    }
    const handleChatClick = (tabNum, courtID) =>{
        setTab(4)
        setCourt(courtID)
    }
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <img className="logo" alt="" src={vchatlogo}/>
                <Menu theme="dark"  mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={()=>setTab(1)}>
                        Players Map
                    </Menu.Item>
                    {/*<Menu.Item key="2" icon={<DesktopOutlined/>}>*/}
                    {/*    My Player*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={()=>setTab(3)} >
                        Talk to Admin
                    </Menu.Item>

                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Your Local Groups">
                        {groups && console.log(groups)}
                        {/*{snapshot && snapshot.val().map((val, ind)=>console.log(val, ind))}*/}
                        {groups?
                            (
                                Object.values(groups).map(
                                    (val,ind)=><Menu.Item key={'sub'+ind} onClick={()=>handleChatClick(4, val.cid)}>{val.court}</Menu.Item>)
                            )
                            :
                            <Menu.Item key="80">Add your local groups</Menu.Item>
                        }

                    </SubMenu>

                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/*<Header className="site-layout-background" style={{padding: 0}}/>*/}
                    {/*<DataContext.Provider ></DataContext.Provider>*/}

                {/*{console.log(court, 'Fuck Derek no console')}*/}
                {tab===4?<GroupChat court={court}/>:<Window tabNum={tab} />}




                <Footer style={{textAlign: "center"}}>
                    GTA-Baller ©2021 Created by Codhog
                </Footer>
            </Layout>
        </Layout>
    );
}
export default Main