import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import ClassmatesModal from '../ClassmatesModal/ClassMates'
import './Chat.css';
import {List, ListItem, ListItemText, BottomNavigationAction} from '@material-ui/core'
import Chatters from '../Chatters/Chatters'
import { connect } from 'react-redux';
import axios from 'axios'
import chatters from "../../redux/reducers/chatters";
class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
        username:this.props.user.username,
        currentChatter:'',
        chatters:[],
        allMessages:[],
        messagesToShow:[],//messages get filtered 
        socket:io('http://localhost:4000/'),
        message:'',
        modalOpened:false
    };
  }
  componentWillMount(){

    let allMessagesAndChatters = {}
    if (this.props.allMessages.length !== 0){
      this.setState({allMessages:this.props.allMessages})
      this.setState({allChatters:this.props.allChatters})
    }else{
      axios.get(`http://localhost:5000/messages/${this.state.username}/chatters`)
      .then(res=>{
        const allChattersWithoutCurrentUser = res.data.filter(chatter => chatter != this.state.username)
        allMessagesAndChatters.chatters = allChattersWithoutCurrentUser
        this.setState({chatters:allChattersWithoutCurrentUser})
      })
      axios.get(`http://localhost:5000/messages/${this.state.username}`)
      .then(res=>{
        allMessagesAndChatters.messages = res.data
        this.setState({allMessages:allMessagesAndChatters.messages})
        this.props.setMessagesAndChatters(allMessagesAndChatters)
      })
      if(this.props.location.state != null){
        this.setState({currentChatter:this.props.location.state.sendMessageTo, chatters:[this.props.location.state.sendMessageTo]})
      }
    }
    
    // console.log(this.props.connectedClients)
    //dont really need below code because now we have a database.
    // if(this.props.connectedClients.socketID != ""){
    //   this.setState({allMessages:this.props.connectedClients})
    //   this.setState({chatters:this.props.connectedClients.chatters})
    //   this.filterMessages(this.props.connectedClients,this.state.currentChatter)
    // }

    // this.filterMessages(this.props.connectedClients)
    /*get messages from redux state because if you don't, messages aren't saved. it's either
    this or you keep asking for the messages from socket.io which is too many calls.*/
    this.state.socket.emit('user_connected',this.state.username)
    this.state.socket.on('private_message', (message,to) => {
        var message = {
          from:this.state.username,
          to:to,
          message:message
          //missing id and created_at but that is stored on the backend, this can cause a problem later on
        }
        this.props.addMessage(message)//add message to redux
        //if the message is being sent to a new chatter, update redux and current state.

        // if(this.state.chatters.findIndex(to) == -1) {
        //   this.setState({
        //     chatters: [...this.state.chatters, to]
        //   })
        //   this.props.addChatter(to)
        // }
        console.log(message)
        this.setState({
          allMessages:[...this.state.allMessages,message]
        })
        // this.setState({chatters:messagesAndChatters.chatters})
        // this.setState({allMessages:messagesAndChatters})
        this.filterMessages(this.state.allMessages,this.state.currentChatter)
    });
    // this.props.classMates
  }
  componentWillUnmount(){
    // this.props.updateConnectedClients(this.state.connectedClients)
  }
  filterMessages = (allMessages,currentChatter) => {
    var messagesToShow = []
    var messageIndex = 0;
    //regular filtering doesn't work for some reason.
    for(var i = 0; i < allMessages.length; i++){
      if(allMessages[i].from == currentChatter || allMessages[i].to === currentChatter){
        messagesToShow[messageIndex++] = allMessages[i]
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
    
    const newMessage = {
      message:this.state.message,
      from: this.state.username,
      to:this.state.currentChatter
    };
    this.setMessage('')

    // axios.post('http://localhost:5000/messages/',newMessage)
    // .then(()=>console.log('message posted correctly')).catch( (error) => {
    //     console.log(error);
    // });
  }
  setMessage = (message) =>{
    this.setState({message:message})
  }
  addChatter = (chatterUsername) => {
    const isChatterAlreadyInChatters = this.state.chatters.indexOf(chatterUsername)
    console.log(isChatterAlreadyInChatters)
    if(isChatterAlreadyInChatters == -1) this.setState({chatters:[...this.state.chatters, chatterUsername]})
    this.changeChatter(chatterUsername)
  }
  changeChatter = (classmate) =>{
    this.setState({currentChatter:classmate})//if messages are sent now, it will be sent to the current chatter.
    this.filterMessages(this.state.allMessages,classmate)//you want to now show messages for the new focused current new chatter.
  }
  openModal = () => {
    this.setState({modalOpened:true})
  }
  closeModal = () => {
    this.setState({modalOpened:false})
  }
  render(){
      return (
        <div className="outerContainer">
          <Chatters username = {this.state.username} chatters = {this.state.chatters} changeChatter={this.changeChatter} currentChatter={this.state.currentChatter}/>
          <div className="container">
              <InfoBar openModal = {this.openModal} room={this.state.currentChatter}  />
              <Messages messages={this.state.messagesToShow} currentChatter={this.state.currentChatter} currentUser={this.state.username} />
              <Input message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} currentChatter={this.state.currentChatter}/>
              {this.state.modalOpened && <ClassmatesModal addChatter = {this.addChatter} changeChatter= {this.changeChatter} modalOpened={this.state.modalOpened}classMates={this.props.classMates} closeModal={this.closeModal}/>}
          </div>
        </div>
      );
  }
}
Chat.defaultProps = {
  connectedClients:[],
  classMates:[],
  username:{username:'akhil'}
}                                                   
const mapStateToProps = (state) => (
      {
        allMessages:state.chatters.messages,
        allChatters:state.chatters.chatters,
        classMates:state.classes.classMates,
        user:state.logged.user
      }
)

function mapDispatchToProps(dispatch){
  return {
    setMessagesAndChatters:(allMessages)=>{
      dispatch({
        type:'set_messages_and_chatters_from_db',
        payload:allMessages
      })
    },
    addMessage:(message)=>{
      dispatch({
        type:'ADD_MESSAGE',
        payload:message
      })
    },
    addChatter:(chatter)=>{
      dispatch({
        type:'ADD_CHATTER',
        payload:chatter
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat)
// export default connect(mapStateToProps, {signIn})(Signup);


