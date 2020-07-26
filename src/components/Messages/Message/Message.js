import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message, currentChatter, username }) => {
  // console.log(message)
  // console.log(username)
  var text = message.text || message.message// from the backend, i have field name as message but from the frontend i have the field name as text
  let time = message.created_at || "2020-07-01T08:35:13.634Z";
  if(time.length > 5) time = time.substring(11,16)
  let hour = parseInt(time.substring(0,2))
  if(hour>12){
    hour%=12
    time = hour + time.substring(2)
  }
  // console.log(time)
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
        <p className="time">{time}</p>
      </div>
    ):
      (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>

          <p className="time">{time}</p>
        </div>
      )
  )
}

export default Message;