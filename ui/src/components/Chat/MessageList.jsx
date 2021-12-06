import React, { memo } from "react";


// {value.map((values, i) => <MessageEach key={i+1} sender={values.sender} time={time} text={values.text}/>)}
// const areEqual = (prevProps, nextProps) => true;


const MessageEach = memo(function MessageEach(props){
  const time = "上午8:45:25";
  console.log(props)
  const {avatar, text} = props
  const ClassName = "messages-text-lis"
  return(
    <li className="messages-text-lis">
    <h6>
      <img src={avatar} alt='avatar' className='avatar'/>
      <span className="time">{time}</span>
    </h6>
    <p>{text}</p>
  </li>

  )
})



export default MessageEach;
