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
        modalOpened:false,
        notification:{}
    };
  }
  componentWillMount(){
    console.log('mounted again')
    let allMessagesAndChatters = {}
    const config = setConfig()   
    if (this.props.allMessages.length !== 0 && this.props.allChatters.length != 0){
      //this is so we only call to the database once, and redux has all the data stored from the db. 
      this.setState({allMessages:this.props.allMessages})
      this.setState({chatters:this.props.allChatters})
      // don't even need state, we can use this props allMessages instead of using the state. maybe will change that later to clean it up
    }else{
      axios.get(`http://localhost:5000/messages/${this.state.username}/chatters`,config)
      .then(res=>{
        console.log(res.data)
        const allChattersWithoutCurrentUser = res.data.filter(chatter => chatter != this.state.username)
        allMessagesAndChatters.chatters = allChattersWithoutCurrentUser
        this.setState({chatters:allChattersWithoutCurrentUser})
      })
      axios.get(`http://localhost:5000/messages/${this.state.username}`,config)
      .then(res=>{
        allMessagesAndChatters.messages = res.data
        this.setState({allMessages:allMessagesAndChatters.messages})
        this.props.setMessagesAndChatters(allMessagesAndChatters)
      }).then(() =>{
        console.log('yay')
        if(this.props.location.state != null){
          console.log('only when u come from class component')
          const newChatter = this.props.location.state.sendMessageTo
          this.setState({currentChatter:newChatter})
          if(!this.props.allChatters.includes(newChatter)) this.setState({chatters:[...this.state.chatters,newChatter]})
          this.filterMessages(this.props.allMessages, newChatter)
        }
      })
    }
    if(this.props.location.state != null){
      console.log('only when u come from class component')
      const newChatter = this.props.location.state.sendMessageTo
      this.setState({currentChatter:newChatter})
      // console.log(thi)
      if(!this.props.allChatters.includes(newChatter)) this.setState({chatters:[...this.state.chatters,newChatter]})
      this.filterMessages(this.props.allMessages, newChatter)
    }
    this.setState({chatters:this.props.allChatters})
    this.filterMessages(this.props.allMessages, this.state.currentChatter)
    
    this.state.socket.emit('user_connected',this.state.username)
    this.state.socket.on('private_message', (message,from) => {
      console.log('message received!')
        if(from!==this.state.currentChatter){
          this.setState({notification:{message,user:from}})
        }else{
          this.setState({notification:{}})
        }
        if(this.state.chatters.indexOf(from) === -1) this.setState({chatters:[...this.state.chatters,from]})
        var message = {
          from:from,
          to:this.state.username,
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
    
      const today = new Date();
      let minutes = today.getMinutes()
      if(minutes/10<1) {
        minutes = "0"+minutes
      }
      const time = today.getHours()%12 + ":" + minutes;
      const newMessage = {
        message:this.state.message,
        from: this.state.username,
        to:this.state.currentChatter,
        created_at:time
      };
      this.setState({messagesToShow:[...this.state.messagesToShow,newMessage]})
      this.props.addMessage(newMessage)
      this.setState({allMessages:[...this.state.allMessages,newMessage]})
      // this.filterMessages(this.state.allMessages,this.state.currentChatter)
      this.setMessage('')
    }

    //save message to database, but i have it commented bcause too many messages will stop saving eventually (free atlas).
    // axios.post('http://localhost:5000/messages/',config,newMessage)
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
    if(this.state.notification.user === classmate) this.setState({notification:{}})
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
          <Chatters notification={this.state.notification} username = {this.state.username} chatters = {this.state.chatters} changeChatter={this.changeChatter} currentChatter={this.state.currentChatter}/>
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


