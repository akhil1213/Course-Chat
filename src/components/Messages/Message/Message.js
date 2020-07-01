import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message, currentChatter, username }) => {
  console.log(message)
  console.log(username)
  var text = message.text || message.message// from the backend, i have field name as message but from the frontend i have the field name as text

  // //these messages can be either from someone sending it to us but if not 
  // //then when we're sending the message so user is the person we're sending the message to.
  // var user = null;
  // if(message.from != null ) {
  //   user = message.from
  // }else{
  //   user = message.to
  // }
  // console.log(text)
  // console.log(user)//user is dependent on the message.
  // console.log(from)//from is current chatter, the person we care about.
  let isSentByCurrentUser = true;
  let senderName;
  // let isSentByWantedSender = false
  // let senderName = name.trim().toLowerCase();

  // if(user === senderName) {
  //   isSentByCurrentUser = true;
  // }
  // if(user === from){
  //   isSentByWantedSender=true
  // }
  if(message.from!=null && message.from != username){//if the message isnt from the current user or it isnt null then its sent by the current user
    isSentByCurrentUser = false;
    senderName = message.from.trim().toLowerCase();
  }
  return (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ):
      (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
  )
}

export default Message;