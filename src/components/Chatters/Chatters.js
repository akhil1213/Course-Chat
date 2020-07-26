import React, { Component } from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core'
import './Chatters.css';


class Chatters extends React.Component {
    state = {  }
    render() {
        const {chatters,currentChatter,notification} = this.props
        return (
            <div className="chattersList">
                {chatters.map((classmate) => {
                return (
                    <ListItem
                        id = {(currentChatter == classmate ? "currentChatter" : "chatter")}
                        button
                        onClick={() => this.props.changeChatter(classmate)}
                    >
                    <p>{classmate}</p><br></br>
                    {notification.user === classmate ? <p>{notification.message}</p> : null}
                    </ListItem>
                )
                })}
          </div>
        );
    }
}

export default Chatters;