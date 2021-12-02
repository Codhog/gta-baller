import {useContext, useState} from "react";
import {Row} from "antd";
import {AuthContext} from '../../index'

const MeetEvent = (props) => {
    const {sonInfo} = props
    const userName = useContext(AuthContext);
    const userEmail = userName.email.split('@')[0]
    console.log('UsErName', userName)


    return (
        <>
            <Row>
                <table>
                    <tbody>
                    <tr>
                        <th>Area</th>
                        <th>Description</th>
                        <th>Indoor?</th>
                        <th>Drop in?</th>
                        <th>Free?</th>
                    </tr>
                    <tr>
                        <td>{sonInfo.area}</td>
                        <td className='td-description'>{sonInfo.description}</td>
                        <td>{sonInfo.indoor}</td>
                        <td>{sonInfo.dropIn}</td>
                        <td>{sonInfo.free}</td>
                    </tr>
                    </tbody>


                </table>
            </Row>


        </>
    )

}

export default MeetEvent