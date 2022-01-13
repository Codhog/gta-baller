import * as React from 'react';
import imgs from './imgs/imgs';
import {Button, Col, Row, Divider} from 'antd';
import MeetEvent from "./MeetEvent";
import {Chart} from "./Chart/Chart"
import toast, { Toaster } from 'react-hot-toast';


const FakeMapPopUp = props => {
    console.log(props)
    const courtInfo = props.info
    const {id:courtId, court:courtName, manNum} = courtInfo
    const pathName = courtName.replace(/\s+/g, '_').toLowerCase()
    console.log(pathName, '+_+s')
    // 查找用户感兴趣的群组是什么 提前加载好用户是否喜欢了这些场地
    const handleIntClick =  () => {
        toast('You need to log in first.');

    };


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

            <Divider>Are you coming?</Divider>
            <Row>
                <Col span={12} offset={7}>
                    <Button onClick={handleIntClick}>Not Interested</Button>
                    <span>&emsp;</span>
                    <Button onClick={handleIntClick}>I'm interested</Button>
                </Col>

            </Row>
        </>
    );
};

export default React.memo(FakeMapPopUp);
