import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import styles from './componentCSS/index.module.css';
import ChatContainer from './components/App';
import SocketContext from './components/socketContext';


const socket = io('http://localhost:4000', {
  autoConnect: false
});

/*
socket.onAny((event, ...args) => {
  console.log(event, args);
});
*/


function MainContainer() {


  let textInput = React.createRef();
  const [username, setUsername] = useState('');
  socket.auth = {username};
  const preventDefault = (e) => {
    e.preventDefault();
    console.log("Username selected!!");
    setUsername(textInput.current.value);
    socket.auth = { username: username };
    socket.connect();

  }
  //console.log("Chat container executed!!");



  if (socket.auth.username!== '')
    return <ChatContainer username={username} />


  return (
    <form onSubmit={preventDefault}>
      <input ref={textInput} name="username" id="username" type="text" placeholder="Username" />
      <br />
      <button> Set Username </button>
    </form>
  );


}


ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <React.StrictMode>
      <MainContainer />
    </React.StrictMode>
  </SocketContext.Provider>
  ,
  document.getElementById('root')
);





