import React, { Component } from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core'
import './Chatters.css';


class Chatters extends React.Component {
    state = {  }
    render() {
        const {chatters,currentChatter,notifications} = this.props
        return (
            <div className="chattersList">
                {chatters.map((classmate) => {
                // if(notifications.length)
                const notificationUsers = notifications.map((notificationObj)=> {return notificationObj.from})//turn array of objects{from,message} to array of [froms] where froms are just usernames to find the index of user.
                const notification = notificationUsers.findIndex(notificationUser => notificationUser === classmate)
                console.log(notification)
                return (
                    <ListItem
                        id = {(currentChatter == classmate ? "currentChatter" : "chatter")}
                        button
                        onClick={() => this.props.changeChatter(classmate)}
                    >
                    <p>{classmate}</p>
                    {notification!==-1 ? <p>{notifications[notification].message}</p> : null}
                    </ListItem>
                )
                })}
          </div>
        );
    }
}

export default Chatters;