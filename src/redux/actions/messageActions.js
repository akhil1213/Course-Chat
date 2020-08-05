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
const getNotifications = (currentUser,allMessages,dispatch)=>{
    let notifications = []
    for(let i = allMessages.length-1; i >= 0; i--){
        if(allMessages[i].to == currentUser && (allMessages[i].seen == false || allMessages[i].seen == undefined)){
            if(!notificationIncludes(notifications,allMessages[i].from)){
                const from = allMessages[i].from
                const message = allMessages[i].message
                notifications.push({from,message})//there is a notification from this user.
            }
        }
    }
    dispatch({
        type:"SET_NOTIFICATIONS",
        payload:notifications
    })
}
export default function getMessagesAndChatters(dispatch,username){
    const config = setConfig()
    axios.get(`${uri}messages/${username}/chatters`,config)
        .then(res=>{
            const chatters = res.data.filter(chatter => chatter != username)
            dispatch({
                type:'SET_CHATTERS',
                payload:chatters
            })
        }).then(()=>{//get messages for user
            axios.get(`${uri}messages/${username}`,config)
            .then(res=>{
                dispatch({
                    type:'SET_MESSAGES',
                    payload:res.data
                })
                getNotifications(username,res.data,dispatch)
            })
    })
}
    