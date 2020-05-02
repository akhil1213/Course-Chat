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
  const [connectedClients,setConnectedClients] = useState({
    chatters:[],
    messages:[],
    socketId:''
  });
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
    setCurrentChatter(to)
    setName(name)
    socket.on('private_message', (connectedClients) => {
      // if( message.to == name){//name is current user. we won't want current user to send message to themselves.
      // setCurrentChatter(message.user)
      console.log(name)
      console.log(to)
      console.log("YOOOOO")
      setCurrentChatter(to)
      setName(name)
        setConnectedClients(connectedClients)
        console.log(connectedClients)  
      // setMessages(messages => [ ...messages, message ]);
      //   setUsers(users => [...users,message.user])
        // console.log(users)
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
      setMessages(messages=>[...messages,{text:message,from:name,to:null}])
      console.log(messages)
    }
  }
  return (
    <div className="outerContainer">
      {connectedClients.chatters.map((classmate) => {
        return (
          <ListItem
            button
            onClick={() => { setCurrentChatter(classmate) }}
          >
            <p>{classmate}</p>

          </ListItem>
        )
      })}
      <div className="container">
          <InfoBar room={currentChatter} />
          <Messages messages={connectedClients.messages} currentChatter={currentChatter} currentUser={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
