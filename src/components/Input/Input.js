import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, currentChatter }) => (
  // <div className="container">
    <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button disabled = {currentChatter == ''} className={currentChatter !== '' ? "sendButton" : 'redSendButton'} onClick={e => sendMessage(e)}>Send</button>
  </form>
  // </div>
  
)

export default Input;