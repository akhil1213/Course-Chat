import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
import {List, ListItem, ListItemText} from '@material-ui/core'

let socket;

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
        username:this.props.location.state.username,
        currentChatter:this.props.location.state.sendMessageTo,
        connectedClients:{
          chatters:[],
          messages:[],
          socketId:''
        },
        socket:io('http://localhost:4000/'),
        message:''
    };
  }
  componentWillMount(){
    this.state.socket.emit('user_connected',this.state.username)
    this.state.socket.on('private_message', (connectedClients) => {
        var messagesToShow = []
        var messageIndex = 0;
        for(var i = 0; i < connectedClients.messages.length; i++){
          if(connectedClients.messages[i].from == this.state.currentChatter || connectedClients.messages[i].to === this.state.currentChatter){
            messagesToShow[messageIndex++] = connectedClients.messages[i]
          }
        }
        console.log(messagesToShow)
        connectedClients.messages = messagesToShow
        // connectedClients.messages.filter(message =>
        //   message.from == this.state.currentChatter || message.to === this.state.currentChatter
        // )
        console.log(connectedClients)
        this.setState({connectedClients:connectedClients})
        console.log(connectedClients)
    });
    
  }

  sendMessage = (event) => {
    event.preventDefault();
    if(this.state.message != '') {
      this.state.socket.emit('sendPrivateMessage', this.state.message,this.state.username,this.state.currentChatter, () => this.setMessage(''));
    }
  }
  setMessage = (message) =>{
    this.setState({message:message})
  }
  changeChatter = (classmate) =>{
    this.setState({currentChatter:classmate})
    this.state.socket.emit('changedChatter',this.state.username)
  }
  render(){
      return (
        <div className="outerContainer">
          <div className="chattersList">
            {this.state.connectedClients.chatters.map((classmate) => {
              return (
                <ListItem
                  id = "chatter"
                  button
                  onClick={() => this.changeChatter(classmate)}
                >
                  <p>{classmate}</p>
                </ListItem>
              )
            })}
          </div>
          <div className="container">
              <InfoBar room={this.state.currentChatter} />
              <Messages messages={this.state.connectedClients.messages} currentChatter={this.state.currentChatter} currentUser={this.state.username} />
              <Input message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} />
          </div>
        </div>
      );
  }
}


export default Chat;
