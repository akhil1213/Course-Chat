import io from "socket.io-client";
var socket = io('http://localhost:4000')
const getTime = () =>{
  const today = new Date();
  let minutes = today.getMinutes()
  if(minutes/10<1) {
    minutes = "0"+minutes
  }
  const time = today.getHours()%12 + ":" + minutes;
  return time
}
const initializeSocket = (props, currentComponent) =>{
  socket.emit('user_connected',props.user.username)
  if(currentComponent!='chat'){
    socket.removeAllListeners()
    /*this is crucial because you can have duplicate listeners so private message from
     chat component and on private message from every other component which leads to 
     duplicated messages.*/
    socket.on('private_message', (message,from) => {
      var messageObject = {
        from:from,
        to:props.user.username,
        message:message,
        time:getTime()
      }

      props.addChatter(from)
      props.addNotification({from,message})
      props.addMessage(messageObject)//add message to redux 
    });
  }
}



export default {initializeSocket,socket,getTime}