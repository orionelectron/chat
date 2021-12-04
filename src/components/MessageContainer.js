import React, { useState } from 'react';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';
import styles from '../componentCSS/MessageContainer.module.css'
function MessageContainer(props) {
    return (
        <div className={styles.message_container}>
            <MessageItem friend={props.friend}/>
            <ChatInput friend={props.friend} />
        </div>

    )
}

export default MessageContainer;