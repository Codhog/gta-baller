import * as React from 'react';
import imgs from './imgs/imgs';
import {Button, Col, Row, Divider, Menu} from 'antd';
import MeetEvent from "./MeetEvent";
import {Chart} from "./Chart/Chart"
import {useContext, useEffect, useState} from "react";
import {ref, onValue, set} from "firebase/database";
import {database} from '../firebase'
import {AuthContext} from '../../index'



const MapPopup = props => {
    const {info} = props;
    const courtName = info.court
    const pathName = courtName.replace(/\s+/g, '_').toLowerCase()

    const [go, setGo] = useState(false)
    const [goNum, setGoNum] = useState(null)

    const AuthValue = useContext(AuthContext);
    // const headCountRef = ref(database, 'courtInfo/'+info.id+'/manNum')
    // const userEmail = userName.email.split('@')[0]
    const handleIntClick = () => {
        // Get interested head count before updating
        // Check if initial state is empty
        // console.log(userName.email, 'sada', typeof info.id)
        setGo(true);

        // set(ref(database, 'userGroups/'+AuthValue.uid),
        //     [{'0': 'Aaniin'},{'3':"West End YMCA"}]
        // );
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
         {/*   header*/}
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

            <Divider>Popularity of last 7 days {`${info.manNum}`}</Divider>
            <Row justify="space-around" align="middle">
                <div className='chart-wrapper'>
                    <Chart />
                </div>
            </Row>
            <Divider>Are you coming?</Divider>
            <Row>
                <Col span={12} offset={7}>
                    {
                        go ?
                            <>
                                <Button onClick={handleNotIntClick}>Not Interested</Button>
                                <span>&emsp;</span>
                                <Button types='primary' onClick={handleIntClick}>I'm interested</Button>
                            </>

                            :
                            <>
                                <Button danger onClick={handleNotIntClick}>Not Interested</Button>
                                <span>&emsp;</span>
                                <Button onClick={handleIntClick}>I'm interested</Button>
                            </>

                    }
                </Col>

            </Row>
        </>
    );
};

export default React.memo(MapPopup);
