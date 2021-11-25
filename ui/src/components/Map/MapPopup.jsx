import * as React from 'react';
import imgs from './imgs/imgs';
import {Button, Col, Row, Divider } from 'antd';
import MeetEvent from "./MeetEvent";
import {Chart} from "./Chart/Chart"
import {useContext, useState} from "react";
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, child, get, set, update} from "firebase/database";
import firebaseConfig from '../firebase'
import {AuthContext} from '../../index'
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const MapPopup = props => {
    const {info} = props;
    const courtName = info.court
    const pathName = courtName.replace(/\s+/g, '_').toLowerCase()

    const [go, setGo] = useState(false)
    const userName = useContext(AuthContext);
    const userEmail = userName.email.split('@')[0]
    console.log('UsErName', userName)
    const handleIntClick = () => {
        // Get interested head count before updating
        // Check if initial state is empty
        console.log(userName.email, 'sada', typeof info.id)
        setGo(true);


        get(child(ref(database), 'courtHeadCount/'+info.id)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                update(ref(database, 'courtHeadCount/'+info.id), {
                    'headCount': snapshot.val().headCount+1
                })
            } else {
                set(ref(database, 'courtHeadCount/'+info.id), {
                    'username':userEmail,
                    'courtName': info.court,
                    'headCount': 1
                })
            }
        }).catch((error) => {
            console.error(error);
        });



        // set(ref(database, 'courtInfo/'+info.id), info)
    };

    const handleNotIntClick = () => {
        setGo(false)
    };

    return (
        <>
         {/*   header*/}
         <Row>
             <Divider>{courtName}</Divider>
             </Row>
            {/*body*/}
                <Row align="middle">
                    <Col span={10} push={1}>
                            <img alt={{courtName}}
                                 className="profileImg"
                                 src={imgs[`${pathName}`]}/>
                    </Col>
                    <Col span={14} pull={1}>
                        <MeetEvent info={info}/>
                    </Col>
                </Row>

            <Divider>Popularity of last 7 days</Divider>
            <Row justify="space-around" align="middle">
                <Chart />
            </Row>
            <Divider>Are you coming?</Divider>
            <Row>
                <Col span={10} offset={8}>
                    {
                        go ?
                            <>
                                <Button onClick={handleNotIntClick}>Not Interested</Button>
                                <Button types='primary' onClick={handleIntClick}>I'm interested</Button>
                            </>

                            :
                            <>
                                <Button danger onClick={handleNotIntClick}>Not Interested</Button>
                                <Button onClick={handleIntClick}>I'm interested</Button>
                            </>

                    }
                </Col>

            </Row>
        </>
        // < >
        //     <Row justify="end">
        //         <Col span={16}><img
        //             alt={`${courtName}`}
        //             className="profileImg"
        //             src={imgs[`${pathName}`]}/></Col>
        //         <Col span={7} offset={1} >
        //             <div className="popularity-timer">
        //                 <h5>🔥Popularity</h5>
        //             </div>
        //
        //         </Col>
        //     </Row>
        //     <Row>
        //         <MeetEvent info={info}/>
        //     </Row>
        //
        //
        //     <Row>
        //         {
        //             go ?
        //                 <>
        //                     <Button onClick={handleNotIntClick}>Not Interested</Button>
        //                     <Button types='primary' onClick={handleIntClick}>I'm interested</Button>
        //                 </>
        //
        //                 :
        //                 <>
        //                     <Button danger onClick={handleNotIntClick}>Not Interested</Button>
        //                     <Button onClick={handleIntClick}>I'm interested</Button>
        //                 </>
        //
        //         }
        //
        //
        //     </Row>
        //
        //
        //
        // </>
    );
};

export default React.memo(MapPopup);
