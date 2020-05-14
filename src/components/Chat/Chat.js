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
        connectedClients:{
          chatters:[this.props.location.state.sendMessageTo],
          messages:[],
          socketId:''
        },
        socket:io('http://localhost:4000/'),
        message:''
    };
  }
  componentWillMount(){
    this.setState({connectedClients:this.props.connectedClients})
    // this.filterMessages(this.props.connectedClients)
    /*get messages from redux state because if you don't, messages aren't saved. it's either
    this or you keep asking for the messages from socket.io which is too many api calls.*/
    this.state.socket.emit('user_connected',this.state.username,this.props.connectedClients)
    this.state.socket.on('private_message', (connectedClients) => {
        //this.props.updateConnectedClients(connectedClients)//set connected clients to redux
        console.log(connectedClients)
        this.filterMessages(connectedClients)
    });
  }
  componentWillUnmount(){
    this.props.updateConnectedClients(this.state.connectedClients)
  }
  filterMessages = (connectedClients) => {
    var messagesToShow = []
    var messageIndex = 0;
    //regular filtering doesn't work for some reason.
    for(var i = 0; i < connectedClients.messages.length; i++){
      if(connectedClients.messages[i].from == this.state.currentChatter || connectedClients.messages[i].to === this.state.currentChatter){
        messagesToShow[messageIndex++] = connectedClients.messages[i]
      }
    }
    console.log(messagesToShow)
    connectedClients.messages = messagesToShow
    this.setState({connectedClients:connectedClients})
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
    this.setState({currentChatter:classmate})
    this.state.socket.emit('changedChatter',this.state.username)
    // this.filterMessages(this.props.connectedClients)
  }
  render(){
      return (
        <div className="outerContainer">
          <Chatters connectedClients = {this.state.connectedClients} changeChatter={this.changeChatter} currentChatter={this.state.currentChatter}/>
          <div className="container">
              <InfoBar room={this.state.currentChatter} />
              <Messages messages={this.state.connectedClients.messages} currentChatter={this.state.currentChatter} currentUser={this.state.username} />
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


