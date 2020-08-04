import {uri} from '../../uri'
import axios from 'axios'
import {setConfig} from '../actions/isLogged'
const notificationIncludes = (notifications,user) => {
    for(let j = 0; j < notifications.length; j++) {
        if (notifications[j].from == user) {//is there already a notification from this user, don't add duplicated notification~
            return true;
        }
    }
    return false
}
const getNotifications = (props)=>{
    let currentUser = props.user.username;
    let notifications = []
    for(let i = props.allMessages.length-1; i >= 0; i--){
        if(props.allMessages[i].to == currentUser && props.allMessages[i].seen == false){
            console.log(props.allMessages[i])
            if(!notificationIncludes(notifications,props.allMessages[i].from)){
                const from = props.allMessages[i].from
                const message = props.allMessages[i].message
                notifications.push({from,message})//there is a notification from this user.
            }
        }
    }
    props.setNotifications(notifications)
}
export default function getMessagesAndChatters(props){
    const config = setConfig()
    if (props.allMessages.length === 0 && props.allChatters.length === 0){
        axios.get(`${uri}messages/${props.user.username}/chatters`,config)
            .then(res=>{
            const allChattersWithoutCurrentUser = res.data.filter(chatter => chatter != props.user.username)
            props.setChatters(allChattersWithoutCurrentUser)
            }).then(()=>{//get messages for user
                axios.get(`${uri}messages/${props.user.username}`,config)
                .then(res=>{
                    props.setMessages(res.data)
                })
        })
    }
    getNotifications(props);
}
    