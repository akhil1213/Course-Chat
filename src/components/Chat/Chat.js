import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
import {List, ListItem, ListItemText, BottomNavigationAction} from '@material-ui/core'
import Chatters from '../Chatters/Chatters'
import { connect } from 'react-redux';

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
        username:this.props.location.state.username,
        currentChatter:this.props.location.state.sendMessageTo,
        chatters:[this.props.location.state.sendMessageTo],
        allMessagesAndChats:{},
        messagesToShow:[],
        socket:io('http://localhost:4000/'),
        message:''
    };
  }
  componentWillMount(){
    console.log('yo')
    console.log(this.props.connectedClients)
    this.setState({allMessagesAndChats:this.props.connectedClients})
    // this.filterMessages(this.props.connectedClients)
    /*get messages from redux state because if you don't, messages aren't saved. it's either
    this or you keep asking for the messages from socket.io which is too many api calls.*/
    this.state.socket.emit('user_connected',this.state.username,this.props.connectedClients)
    this.state.socket.on('private_message', (messagesAndChatters) => {
        this.props.updateConnectedClients(messagesAndChatters)//set connected clients to redux
        this.setState({chatters:messagesAndChatters.chatters})
        this.setState({allMessagesAndChats:messagesAndChatters})
        this.filterMessages(messagesAndChatters,this.state.currentChatter)
        console.log(this.props.connectedClients)

    });
  }
  componentWillUnmount(){
    this.props.updateConnectedClients(this.state.connectedClients)
  }
  filterMessages = (allMessagesAndChats,currentChatter) => {
    var messagesToShow = []
    var messageIndex = 0;
    //regular filtering doesn't work for some reason.
    for(var i = 0; i < allMessagesAndChats.messages.length; i++){
      if(allMessagesAndChats.messages[i].from == currentChatter || allMessagesAndChats.messages[i].to === currentChatter){
        messagesToShow[messageIndex++] = allMessagesAndChats.messages[i]
      }
    }
    console.log(messagesToShow)
    this.setState({messagesToShow:messagesToShow})
  }
  sendMessage = (event) => {
    event.preventDefault();
    if(this.state.message != '') {
      this.state.socket.emit('sendPrivateMessage', this.state.message,this.state.username,this.state.currentChatter, () => this.setMessage(''));
    }
    this.setMessage('')
  }
  setMessage = (message) =>{
    this.setState({message:message})
  }
  changeChatter = (classmate) =>{
    this.setState({currentChatter:classmate})//if messages are sent now, it will be sent to the current chatter.
    this.filterMessages(this.state.allMessagesAndChats,classmate)//you want to now show messages for the new focused current new chatter.
    console.log(this.state.connectedClients)
  }
  render(){
      return (
        <div className="outerContainer">
          <Chatters chatters = {this.state.chatters} changeChatter={this.changeChatter} currentChatter={this.state.currentChatter}/>
          <div className="container">
              <InfoBar room={this.state.currentChatter} />
              <Messages messages={this.state.messagesToShow} currentChatter={this.state.currentChatter} currentUser={this.state.username} />
              <Input message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} />
          </div>
        </div>
      );
  }
}
                                                   
const mapStateToProps = (state) => (
  console.log(state),
      {
        connectedClients:state.chatters.connectedClients,
      }
)

function mapDispatchToProps(dispatch){
  return {
    updateConnectedClients:(connectedClients)=>{
      dispatch({
        type:'UPDATE_CONNECTED_CLIENTS',
        payload:connectedClients
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat)
// export default connect(mapStateToProps, {signIn})(Signup);


