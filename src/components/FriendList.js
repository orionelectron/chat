import React, { useState, useContext, useEffect } from 'react';
import styles from '../componentCSS/FriendList.module.css'
import SocketContext from './socketContext';



function FriendList(props) {
    const socket = useContext(SocketContext);
    const [friends, setFriends] = useState([]);
  

    useEffect(() => {
        //socket.emit("sync");
        socket.once("friend", (friend) => {
            console.log("Got extra friend!", friend);
            
                if (socket.auth.username !== friend.username && friend.username !== '')
                    setFriends((prevFriends, props) => {
                        return [...prevFriends, friend];
                    });
                else
                    setFriends([...friends, {username: '', isOnline:false}])
    

        });
        socket.once("closed", (input_friend) => {
          
            
            const friends1 = friends.map((friend) => {
                
                if (input_friend.username === friend.username )
                    friend.isOnline = input_friend.isOnline;
                    friend.username = input_friend.username;
                return friend;
               
            });
            console.log(input_friend);
            console.log("closed", friends1);
            setFriends([...friends1]);
            
        })
        socket.once("friendList", (friends1) => {
            console.log("friendList ",friends1);
            console.log("current username ", socket.auth.username)
            const friends = friends1.filter((friend) => {
                if (friend.username === '') return false
                if (socket.auth.username !== friend.username) return true
                return false
            });
            console.log(friends)
            setFriends([...friends]);
            

        });

    }, [friends.length]);
    const clickHandler = (e, friend) => {
        console.log("Selected friend: ", friend);
        props.friendSetter({...friend});

    }
    return (
        <div className={styles.friend_container}>
            {friends.map((friend, index) => {
                console.log("Called from FriendList return ", friend);
                if (friend != undefined)
                    return <p onClick={(e) => clickHandler(e, friend)} key={index} className={styles.friend}> {friend.username} Status: {friend.isOnline ? "Online": "Offline"} </p>
            })}
        </div>
    );
}

export default FriendList;
