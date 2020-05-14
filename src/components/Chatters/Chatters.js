import React, { Component } from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core'
import './Chatters.css';


class Chatters extends React.Component {
    state = {  }
    render() {
        return (
            <div className="chattersList">
                {this.props.connectedClients.chatters.map((classmate) => {
                return (
                    <ListItem
                        id = {(this.props.currentChatter == classmate ? "currentChatter" : "chatter")}
                        button
                        onClick={() => this.props.changeChatter(classmate)}
                    >
                    <p>{classmate}</p>
                    </ListItem>
                )
                })}
          </div>
        );
    }
}

export default Chatters;