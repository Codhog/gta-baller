import * as React from 'react';
import imgs from './imgs/imgs';
import {Button, Col, Row, Divider, Menu} from 'antd';
import MeetEvent from "./MeetEvent";
import {Chart} from "./Chart/Chart"
import {useContext, useEffect, useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import {ref, onValue, set, push, get, child} from "firebase/database";
import {database, dbRef} from '../firebase'
import {AuthContext} from '../../index'



const MapPopup = props => {
    const {info} = props;
    const courtName = info.court
    const pathName = courtName.replace(/\s+/g, '_').toLowerCase()

    const [go, setGo] = useState(null)
    // const [goNum, setGoNum] = useState(null)

    const AuthValue = useContext(AuthContext);
    // const headCountRef = ref(database, 'courtInfo/'+info.id+'/manNum')
    // const userEmail = userName.email.split('@')[0]
    const userGroup = ref(database, 'userGroups/'+AuthValue.uid)
    const handleIntClick = async () => {
        // Get interested head count before updating
        // Check if initial state is empty
        setGo(true);
        const headCountRef = ref(database, 'courtInfo/'+info.id+'/manNum')

        const newGroupRef = push(userGroup);

        await set(newGroupRef,
            {"cid": info.id, "court": info.court}
        );
        toast('You can chat with others in local groups now.');
        // set(ref(database, 'groupChat/'+info.id),
        //     [{'uid': AuthValue.uid, 'text':'Hello Peter', 'avatar':AuthValue.photoURL}]
        // );

        // snapshot.val().map(
        // (val,ind)=><Menu.Item key={'sub'+ind} onClick={()=>handleChatClick(4, ind)}>{val}</Menu.Item>)
        //TODO 错误的

        // Object.entries(snapshot.val()).forEach(([key, value])=><Menu.Item
        //     key={'sub'+key}
        //     onClick={()=>handleChatClick(4, key)}>{value}</Menu.Item>
        // update['courtInfo/'+info.id+'/manNum'] = goNum + 1
        // get(child(ref(database), 'courtInfo/'+info.id)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log(snapshot.val())
        //         update(ref(database, 'courtHeadCount/'+info.id), {
        //             'headCount': snapshot.val().headCount+1
        //         })
        //     } else {
        //         set(ref(database, 'courtHeadCount/'+info.id), {
        //             'username':userEmail,
        //             'courtName': info.court,
        //             'headCount': 1
        //         })
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });



        // set(ref(database, 'courtInfo/'+info.id), info)
    };

    const handleNotIntClick = () => {
        setGo(false)
    };
    useEffect(()=>{
        get(userGroup).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val(), 'mapData')
                Object.values(snapshot.val()).filter((val)=>{
                    if(val.cid===info.id){
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
    // }, [info.id])
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
                        <MeetEvent sonInfo={info}/>
                    </Col>
                </Row>

            <Divider>Popularity of last 7 days {`${info.manNum}`}, people are coming</Divider>
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
