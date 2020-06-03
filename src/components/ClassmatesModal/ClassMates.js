import Modal from '@material-ui/core/Modal';
import React, { } from "react";
import {makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import './Classmates.css';
import Dialog from '@material-ui/core/Dialog';



export default class ClassmatesModal extends React.Component{
    constructor(props){
        super(props)
    }
    
    render () {
        return (
            <div id = "body">
                <Dialog
                    open={this.props.modalOpened}
                    onclose={this.props.closeModal}
                    >
                    <List>
                    {this.props.classMates.map((classMate,i) => {
                                return (
                                        <ListItem
                                            button
                                            id="listItem"
                                            // onClick={() => { this.props.getStudentsForClass(classObject,classObject._id) }}
                                            // onClick={this.listItemClicked(i)}
                                            key={i} 
                                            className="listItem">
                                            <ListItemText
                                                primary={classMate.username}
                                            />
                                        </ListItem>
                                )})
                    }
                    </List>

                </Dialog>
            </div>
            
        )
    }
}