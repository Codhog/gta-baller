import {useState} from "react";
import {Button, Row} from "antd";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from '../firebase'
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const MeetEvent = (info) => {

    const [go, setGo] = useState(false)

    const handleIntClick = () => {
        setGo(true)


        set(ref(database, 'courtInfo/'+info.id), info)
    };

    const handleNotIntClick = () => {
        setGo(false)
    };

    return (
        <>
            <Row>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Area</th>
                        <th>Description</th>
                        <th>Indoor?</th>

                    </tr>
                    <tr>
                        <td>{info.court}</td>
                        <td>{info.area}</td>
                        <td>{info.description}</td>
                        <td>{info.indoor}</td>
                    </tr>

                </table>
            </Row>
            <Row>
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


            </Row>

        </>
    )

}

export default MeetEvent