import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages,currentChatter, currentUser }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} from={currentChatter} name={currentUser}/></div>)}
  </ScrollToBottom>
);

export default Messages;