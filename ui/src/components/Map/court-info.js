import * as React from 'react';
// import * as pics from './imgs'
import imgs from './imgs/imgs';
import {Button, Row} from 'antd';
import MeetEvent from "./MeetEvent";

const CourtInfo = props => {
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

return (
        < >
            {selectedImg(info.court)}
            <MeetEvent info={info} />
    </>
);
};

export default React.memo(CourtInfo);
