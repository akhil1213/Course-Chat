import io from "socket.io-client";
var socket = io('https://still-falls-89885.herokuapp.com/')

socket.emit('user_connected',this.state.username)
socket.on('private_message', (message,from) => {
  console.log('message received!')
    if(from!==this.state.currentChatter){
      this.setState({notification:{message,user:from}})
    }else{
      this.setState({notification:{}})
    }
    if(this.state.chatters.indexOf(from) === -1) this.setState({chatters:[...this.state.chatters,from]})
    const seen = this.state.currentChatter === from
    if(seen) socket.emit('message_seen',from, this.props.user.username)
    var message = {
      from:from,
      to:this.state.username,
      message:message,
      // seen:seen
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
    this.setState({
      allMessages:[...this.state.allMessages,message]
    })
    // this.setState({chatters:messagesAndChatters.chatters})
    // this.setState({allMessages:messagesAndChatters})
    this.filterMessages(this.state.allMessages,this.state.currentChatter)
});
socket.on('message_seen', (personWhoSaw) => {
  console.log(personWhoSaw+"just seen your message!")
  for(var i = this.state.allMessages.length-1; i >=0; i--){
    if(this.state.allMessages[i].to === personWhoSaw){
      this.setState({
        allMessages:[
          ...this.state.allMessages.slice(0,i),
          Object.assign({},this.state.allMessages[i],{seen:true}),
          ...this.state.allMessages.slice(i+1)
        ]
      })
      console.log(this.state.allMessages[i])
      this.filterMessages(this.state.allMessages,this.state.currentChatter)
      console.log(this.state.messagesToShow)
      break;
    }
  }
})

export default socket