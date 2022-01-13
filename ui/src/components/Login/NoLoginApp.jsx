import {Menu} from "antd";
import {DesktopOutlined, PieChartOutlined, TeamOutlined} from "@ant-design/icons";
import vchatlogo from "../../imgs/gtaballerlogo.png";
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import Layout, {Footer, Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import Window from "../Window";

const {SubMenu} = Menu;

const NoLoginApp = () =>{


    const [tab, setTab] = useState(1)
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed =>{
        setCollapsed(collapsed)
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
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Local Groups Chat">
                        <Menu.Item key="nologin2" >
                            You have to login first
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header style={{textAlign: "right"}}>
                    <Link to="/login" >Sign in/Register</Link>
                </Header>

                {/*  court means 0 , 1, 2 courtID*/}
                <Window tabNum={tab} />
                
                <Footer style={{textAlign: "center"}}>
                    GTA-Baller ©2021 Created by Codhog
                </Footer>
            </Layout>
        </>
    );
}

export default NoLoginApp