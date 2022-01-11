import {Layout, Menu} from "antd";
import {DesktopOutlined, PieChartOutlined, TeamOutlined} from "@ant-design/icons";
import Window from "./Window";
import Sider from "antd/es/layout/Sider";
import {Footer, Header} from "antd/es/layout/layout";
import {useState} from "react";

const {SubMenu} = Menu;

const NoLoginApp = () =>{
    const [collapsed, setCollapsed] = useState(false)
    const [tab, setTab] = useState(1)
    const onCollapse = collapsed =>{
        setCollapsed(collapsed)
    }
    return (
        // <Layout style={{minHeight: "100vh"}}>


        <>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                {/*<img className="logo" alt="" src={}/>*/}
                <Menu theme="dark"  mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={()=>setTab(1)}>
                        Players Map
                    </Menu.Item>

                    <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={()=>setTab(3)} >
                        Talk to Admin
                    </Menu.Item>
                    {/* 分离 是否等陆 的逻辑*/}
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Local Groups Chat">
                        {/*<LoginModal googleLoginFunc={handleGoogleLogin}/>*/}
                    </SubMenu>

                </Menu>
            </Sider>


        </>
        // </Layout>
    );
}

export default NoLoginApp