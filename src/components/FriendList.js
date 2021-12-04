import React, { useState, useContext, useEffect } from 'react';
import styles from '../componentCSS/FriendList.module.css'
import SocketContext from './socketContext';
function FriendList(props) {
    const socket = useContext(SocketContext);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        console.log("friends", friends);
    }, [friends.length]);

    useEffect(() => {
        //socket.emit("sync");
        socket.once("friend", (friend) => {
            console.log("Got extra friend!", friend);
            
                if (socket.auth.username !== friend)
                    setFriends([...friends, friend]);
                else
                    setFriends([...friends, ''])
    

        });
        socket.once("closed", (input_friend) => {
            const friends1 = friends.filter((friend) => {
                if (friend === '') return false
                if (input_friend !== friend ) return true
                return false;
            });
            console.log(input_friend);
            console.log(friends1);
            setFriends([...friends1]);
        })
        socket.once("friendList", (friends1) => {
            console.log("friendList " + friends1);
            console.log("current username ", socket.username)
            const friends = friends1.filter((friend) => {
                if (socket.auth.username !== friend) return true
                return false
            });
            console.log(friends)
            setFriends([...friends]);
            

        });

    }, [friends.length]);
    const clickHandler = (e, friend) => {
        console.log("Selected friend: ", friend);
        props.friendSetter(friend);

    }
    return (
        <div className={styles.friend_container}>
            {friends.map((friend, index) => {
                return <p onClick={(e) => clickHandler(e, friend)} key={index} className={styles.friend}> {friend}</p>
            })}
        </div>
    );
}

export default FriendList;
