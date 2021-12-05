import React from 'react';

import MessageContainer from './MessageContainer';




import { useState, useEffect} from "react";

import FriendList from './FriendList';
import styles from '../componentCSS/App.module.css'



function ChatContainer(props) {
  

 
 const [chatFriend, setFriend] = useState({}); 
 

  console.log("Chat container executed!!");

  return (

 
      
        <div className={styles.full_container}>
        <MessageContainer friend={chatFriend}/>
        <FriendList friendSetter={setFriend}/>
        </div>
        

     
    







  )
}

export default ChatContainer;

 


