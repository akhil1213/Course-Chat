import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';
import {When, Choose} from 'jsx-control-statements'
const Message = ({ message: { text, user }, name, from }) => {
  console.log(text)
  console.log(user)//user is dependent on the message.
  console.log(from)//from is current chatter, the person we care about.
  let isSentByCurrentUser = false;
  let isSentByWantedSender = false
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  if(user === from){
    isSentByWantedSender=true
  }

  return (
    <Choose>
          <When condition={isSentByCurrentUser}>
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
          </When>
          <When condition={isSentByWantedSender}>
              <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                  <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10 ">{user}</p>
              </div>
          </When>
    </Choose>
  )
}

export default Message;