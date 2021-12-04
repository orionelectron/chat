import React, {useState, useContext} from 'react';
import '../componentCSS/ChatInput.module.css'
import SocketContext from './socketContext';

function ChatInput(props){
    const [message, setMessage] = useState("");
    const socket = useContext(SocketContext);
    const preventDefault = (e) => {
        e.preventDefault();
        console.log("message submitted");
        socket.emit("message", {message, to: props.friend, from: socket.id});
        setMessage('');

    }
    const onMessageChanged = (e) => {
        setMessage(e.target.value);
    }
    return (
        <form onSubmit={preventDefault}> 
            <input type="text" placeholder="Message" value={message} onChange={onMessageChanged}/>
            <button> Send Message </button>
        </form>
    );
}

export default ChatInput;