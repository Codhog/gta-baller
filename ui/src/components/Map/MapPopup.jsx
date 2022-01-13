import * as React from 'react';
import imgs from './imgs/imgs';
import {Button, Col, Row, Divider} from 'antd';
import MeetEvent from "./MeetEvent";
import {Chart} from "./Chart/Chart"
import {useEffect, useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import {ref, onValue, set, push, get, child} from "firebase/database";
import {database, dbRef} from '../firebase'
import {useAuth} from "../../context/UserAuthContext";

// {info:
// area: "Markham"
// court: "Battle Arena"
// description: "A new court with ample space."
// dropIn: "rental only"
// free: "no"
// id: 2
// indoor: "yes"
// latitude: 43.819365861394104
// longitude: -79.34208009989602
// manNum: 0
// }

const MapPopup = props => {
    console.log(props)
    const courtInfo = props.info
    const {id:courtId, court:courtName, manNum} = courtInfo
    const pathName = courtName.replace(/\s+/g, '_').toLowerCase()
    const [go, setGo] = useState(null)

    const  {displayName:username, uid, photoURL:avatar}  = useAuth().currentUser
    // const headCountRef = ref(database, 'courtcourtInfo/'+courtInfo.id+'/manNum')
    // const userEmail = userName.email.split('@')[0]
    // 查找用户感兴趣的群组是什么 提前加载好用户是否喜欢了这些场地
    const userGroup = ref(database, 'userGroups/'+uid)
    const handleIntClick = async () => {
        // Get interested head count before updating
        // Check if initial state is empty
        setGo(true);
        // const headCountRef = ref(database, 'courtInfo/'+courtId+'/manNum')

        const newGroupRef = push(userGroup);

        await set(newGroupRef,
            {"cid": courtId, "court": courtName}
        );
        toast('You can chat with others in local groups now.');

    };

    const handleNotIntClick = () => {
        setGo(false)
    };
    useEffect(()=>{
        get(userGroup).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val(), 'mapData')
                Object.values(snapshot.val()).filter((val)=>{
                    // val.cid is Users interested location
                    if(val.cid===courtId){
                        setGo(true);
                    }
                })
            } else {
                console.error('firebase not getting query')
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    // useEffect(()=>{
    //     get(child(userGroup, 'courtInfo/')).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             // console.log(snapshot.val(), 'mapData')
    //             setGo(true);
    //         } else {
    //             setGo(false)
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }, [props])

    // useEffect(()=>{
    //     onValue(headCountRef, (snapshot) => {
    //         const data = snapshot.val()
    //         console.log('截图', data)
    //         setGoNum(data)
    //     });
    //
    // }, [courtInfo.id])
    return (

        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
         <Row>
             <Divider>{courtName}</Divider>
             </Row>
                <Row align="middle">
                    <Col span={10} push={1}>
                            <img alt={{courtName}}
                                 className="profileImg"
                                 src={imgs[`${pathName}`]}/>
                    </Col>
                    <Col span={14} pull={1}>
                        <MeetEvent sonInfo={courtInfo}/>
                    </Col>
                </Row>

            <Divider>Popularity of last 7 days {`${manNum}`}, people are coming</Divider>
            <Row justify="space-around" align="middle">
                <div className='chart-wrapper'>
                    <Chart />
                </div>
            </Row>
            {
                go?(
                    <>
                        <Divider>It's your court</Divider>
                        <Row>
                            <Col span={12} offset={7}>
                                <Button onClick={handleNotIntClick}>Not Interested</Button>
                                <span>&emsp;</span>
                                <Button types='primary' disabled>I'm interested</Button>
                            </Col>

                        </Row>
                    </>
                ):(<>
                    <Divider>Are you coming?</Divider>
                    <Row>
                        <Col span={12} offset={7}>
                            <Button danger disabled>Not Interested</Button>
                            <span>&emsp;</span>
                            <Button onClick={handleIntClick}>I'm interested</Button>
                        </Col>

                    </Row>
                </>)
            }
        </>
    );
};

export default React.memo(MapPopup);
