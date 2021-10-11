import * as React from 'react';
// import * as pics from './imgs'
import imgs from './imgs/imgs';
import {Button} from 'antd';
import {useState} from "react";

function CourtInfo(props) {
    const {info} = props;
    const displayName = `${info.court}, ${info.area}`;
    // const picturePath = info.court.replace(/\s+/g, '-').toLowerCase().concat('.png');

    const selectedImg = (id) => {
        console.log(id)
        switch (id) {
            case id:
                let name = id.replace(/\s+/g, '_').toLowerCase()
                // console.log('diaoni', id.replace(/\s+/g, '_').toLowerCase())
                return <img className="profileImg"
                            target="_new"
                            src={imgs[`${name}`]}/>
                break;
            // case 2:
            //     return <img className="profileImg"
            //                 target="_new"
            //                 src={imgs.milliken}/>
            //     break;
        }

    }
    const MeetEvent = () => {
        const [visible, setVisible] = useState(false)
        const [ok, setOk] = useState(false)
        const [cancel, setCancel] = useState(false)
        const [loading, setLoading] = useState(false)

        const handleOk = () => {
            setOk(true);
            setTimeout(() => {
                setLoading(false)
                setVisible(false)
            }, 3000);
        };

        const handleCancel = () =>{
            setCancel(false)
        }

        const handleVisible = () => {
            setVisible(false)
        }

        return (
            <>
                <div className="people-board">
                    {imgs.count}
                </div>

            </>
        )

    }
    return (
        <>
            <div>
                {displayName} |{info.description} | Indoor:{info.indoor}
            </div>
            {selectedImg(info.court)}
            {MeetEvent()}
        </>
    );
}

export default React.memo(CourtInfo);
