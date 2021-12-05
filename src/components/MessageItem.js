import React, { useState, useContext, useEffect } from 'react';
import styles from '../componentCSS/MessageItem.module.css'
import Message from './Message';
import SocketContext from './socketContext';
import MessageContext from './messageContext';
function MessageItem(props) {
    
    console.log(props.friend);
    const [messages, setMessages] = useState([]);
    
    const socket = useContext(SocketContext);
    useEffect(() => {
       socket.once("message", (message) => {
           setMessages([{message: message, username: socket.id}, ...messages]);
       });

       
    },[messages.length]);
    
    console.log("Message Item executed!!", messages);




    return <Message messages={messages} />


}

export default MessageItem;