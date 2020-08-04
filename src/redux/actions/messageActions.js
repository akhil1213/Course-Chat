import {uri} from '../../uri'
import axios from 'axios'
import {setConfig} from '../actions/isLogged'
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
}
    