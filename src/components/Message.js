import React, { useState, useContext } from 'react';
import styles from '../componentCSS/MessageItem.module.css'

function Message(props){
    return (
        <div className={styles.message_container}>
            {props.messages.map((message, index) => {
                return (
                    <p key={index} className={styles.message}>
                        {message.message} 
                    </p>
                
                )
                    
            })
            }


        </div>
    )
     
}

export default Message;