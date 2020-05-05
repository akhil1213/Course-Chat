import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

class Messages extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      return(
        <ScrollToBottom className="messages">
          {this.props.messages.map((message, i) => <div key={i}><Message message={message} currentChatter={this.props.currentChatter} username={this.props.currentUser}/></div>)}
        </ScrollToBottom>
      );      
    }
}

export default Messages;