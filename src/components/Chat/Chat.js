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
import {setConfig} from '../../redux/actions/isLogged.js'
import {uri} from '../../uri'
import socketExport from '../../socket'
class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
        username:this.props.user.username,
        currentChatter:'',
        chatters:[],
        allMessages:[],
        messagesToShow:[],//messages get filtered 
        socket:{},
        // https://still-falls-89885.herokuapp.com/
        message:'',
        modalOpened:false,
    };
  }
  componentDidMount(){
    if(this.props.location.state != null){
      console.log('only when u come from class component')
      const newChatter = this.props.location.state.sendMessageTo
      this.props.setCurrentChatter(newChatter)
      if(!this.props.allChatters.includes(newChatter)) this.props.addChatter(newChatter)//this.setState({chatters:[...this.state.chatters,newChatter]})
      this.filterMessages(this.props.allMessages, newChatter)
    }
    socketExport.socket.removeAllListeners()
    socketExport.socket.on('private_message', (message,from) => {
        if(this.props.allChatters.indexOf(from) === -1) this.props.addChatter(from)
        const seen = this.props.currentChatter === from
        if(seen) socketExport.socket.emit('message_seen',from, this.props.user.username)
        var message = {
          from:from,
          to:this.state.username,
          message:message,
          time:socketExport.getTime()
          //missing id and created_at but that is stored on the backend, this can cause a problem later on
        }
        this.props.addMessage(message)//add message to redux
        this.filterMessages(this.props.allMessages,this.props.currentChatter)
    });
    socketExport.socket.on('message_seen', (personWhoSaw) => {
      console.log(personWhoSaw+"just seen your message!")
      for(var i = this.props.allMessages.length-1; i >=0; i--){
        if(this.props.allMessages[i].to === personWhoSaw){
          const allMessages = [//all messages have messages from different users so we have to check.
            ...this.props.allMessages.slice(0,i),
            Object.assign({},this.props.allMessages[i],{seen:true}),
            ...this.props.allMessages.slice(i+1)
          ]
          this.props.setMessages(allMessages)
          // console.log(this.state.allMessages[i])
          this.filterMessages(allMessages,this.props.currentChatter)
          console.log(this.state.messagesToShow)
          break;
        }
      }
    })
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
    if(this.state.message != '' && this.props.currentChatter != '') {
      socketExport.socket.emit('sendPrivateMessage', this.state.message,this.state.username,this.props.currentChatter, () => this.setMessage(''));
    
      const today = new Date();
      let minutes = today.getMinutes()
      if(minutes/10<1) {
        minutes = "0"+minutes
      }
      const time = today.getHours()%12 + ":" + minutes;
      const newMessage = {
        message:this.state.message,
        from: this.state.username,
        to:this.props.currentChatter,
        created_at:time,
      };
      this.setState({messagesToShow:[...this.state.messagesToShow,newMessage]})
      this.props.addMessage(newMessage)
      // this.setState({allMessages:[...this.state.allMessages,newMessage]})
      // this.filterMessages(this.state.allMessages,this.props.currentChatter)
      this.setMessage('')
    }
  }

  setMessage = (message) =>{
    this.setState({message:message})
  }
  addChatter = (chatterUsername) => {
    const isChatterAlreadyInChatters = this.props.allChatters.indexOf(chatterUsername)
    console.log(isChatterAlreadyInChatters)
    if(isChatterAlreadyInChatters == -1) this.props.setChatters([...this.state.chatters, chatterUsername])
    this.changeChatter(chatterUsername)
  }
  changeChatter = (classmate) =>{
    this.props.setCurrentChatter(classmate)//if messages are sent now, it will be sent to the current chatter.
    this.filterMessages(this.props.allMessages,classmate)//you want to now show messages for the new focused current new chatter.
    for(var i = this.props.allMessages.length-1; i >=0; i--){
      if(this.props.allMessages[i].to === classmate) break;
      if(this.props.allMessages[i].from === classmate){
        socketExport.socket.emit('message_seen',classmate,this.props.user.username)
        const lastMessage = this.state.allMessages[this.state.allMessages.length-1]
        const notificationUsers = this.props.notifications.map((notificationObj)=> {return notificationObj.from})
        const indexOfUserToRemove = notificationUsers.findIndex(notificationUser => notificationUser === classmate)
        this.props.removeNotification(indexOfUserToRemove)
        break;
      }
    }
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
          <Chatters notifications={this.props.notifications} username = {this.state.username} chatters = {this.props.allChatters} changeChatter={this.changeChatter} currentChatter={this.props.currentChatter}/>
          <div className="container">
              <InfoBar openModal = {this.openModal} room={this.props.currentChatter}  />
              <Messages messages={this.state.messagesToShow} currentChatter={this.props.currentChatter} currentUser={this.state.username} />
              <Input message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} currentChatter={this.props.currentChatter}/>
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
        notifications:state.chatters.notifications,
        currentChatter:state.chatters.currentChatter,
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
    },
    setChatters:(chatters)=>{
      dispatch({
        type:'SET_CHATTERS',
        payload:chatters
      })
    },
    setMessages:(messages)=>{
      dispatch({
        type:'SET_MESSAGES',
        payload:messages
      })
    },
    setCurrentChatter:(newChatter)=>{
      dispatch({
        type:'SET_CURRENT_CHATTER',
        payload:newChatter
      })
    },
    removeNotification:(userIndex)=>{
      dispatch({
        type:'REMOVE_NOTIFICATION',
        payload:userIndex
      })
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat)
// export default connect(mapStateToProps, {signIn})(Signup);


