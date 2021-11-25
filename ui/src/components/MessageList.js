import React, { memo, useRef, useEffect, useMemo, useContext } from "react";
import socketIOClient from "socket.io-client";
import {DataContext} from "./Main"


const MessageList = (props) => {

  const value = useContext(DataContext)

  // useEffect(()=>{

    return (
      <ul>
        {value.map((values, i) => <MessageEach key={i+1} {...values} />)}
      </ul>
    );  
  // },[value])



};


// {value.map((values, i) => <MessageEach key={i+1} sender={values.sender} time={time} text={values.text}/>)}
// const areEqual = (prevProps, nextProps) => true;

// The updates to context values doesn't trigger re-render for all the children of the 
// provider, rather only components that are rendered from within the Consumer
const MessageEach = memo(function MessageEach(props){
  const time = "上午8:45:25";
  console.log(props)
  const {sender, text} = props
  return(
    <li className="messages-text-lis">
    <h6>
      <span>{sender}</span>
      <span className="time">{time}</span>
    </h6>
    <p>{text}</p>
  </li>

  )
})



export default MessageList;
