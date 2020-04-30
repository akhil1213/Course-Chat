import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
import {List, ListItem, ListItemText} from '@material-ui/core'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [to, setTo] = useState('');
  const [currentChatter, setCurrentChatter] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:4000/';

  useEffect(() => {
    const { name, to } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setCurrentChatter(to)
    setTo(to);
    setName(name)
    setUsers([...users,to])
    console.log(name)
    // socket.emit('join', { name, room }, (error) => {
    //   if(error) {
    //     alert(error);
    //   }
    // });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {//same as componentdidmount, unmout, willmount
    // socket.on('message', message => {
    //   setMessages(messages => [ ...messages, message ]);
    // });
    const { name, to } = queryString.parse(location.search);
    socket.emit('user_connected',name)
    socket.on('private_message', (message) => {
      // if( message.to == name){//name is current user. we won't want current user to send message to themselves.
      console.log(message)  
      setMessages(messages => [ ...messages, message ]);
        setUsers(users => [...users,message.user])
        console.log(users)
      // }
    });
    
    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(name)
    if(message) {
      socket.emit('sendPrivateMessage', message,name,to, () => setMessage(''));
      console.log(message)
    }
  }
  return (
    <div className="outerContainer">
      {users.map((classmate) => {
        return (
          <ListItem
            button
            onClick={() => { setCurrentChatter(classmate) }}
          >
            <ListItemText primary = {classmate}/>
            <p>fgbfgbfbg</p>
          </ListItem>
        )
      })}
      <div className="container">
          <InfoBar room={currentChatter} />
          <Messages messages={messages} from={currentChatter} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
