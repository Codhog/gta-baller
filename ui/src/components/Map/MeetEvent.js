import {useContext, useState} from "react";
import {Button, Row} from "antd";
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, child, get, set, update} from "firebase/database";
import firebaseConfig from '../firebase'
import {AuthContext} from '../../index'
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const MeetEvent = (props) => {
    const {info} = props
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
            <Row>
                <table>
                    <tbody>
                    <tr>
                        <th>Area</th>
                        <th>Description</th>
                        <th>Indoor?</th>
                        <th>Free?</th>
                    </tr>
                    <tr>
                        <td>{info.area}</td>
                        <td className='td-description'>{info.description}</td>
                        <td>{info.indoor}</td>
                        <td>{info.free}</td>
                    </tr>
                    </tbody>


                </table>
            </Row>


        </>
    )

}

export default MeetEvent