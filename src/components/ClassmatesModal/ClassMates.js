import Modal from '@material-ui/core/Modal';
import React, { } from "react";
import {makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import './Classmates.css';
import Dialog from '@material-ui/core/Dialog';



export default class ClassmatesModal extends React.Component{
    constructor(props){
        super(props)
    }
    clickedClassmate = (classMate) =>{
        this.props.addChatter(classMate.username)
        this.props.closeModal()
    }
    render () {
        return (
            <div id = "body">
                <Dialog
                    id="dialog"
                    open={this.props.modalOpened}
                    onclose={this.props.closeModal}
                    >
                    <List>
                    {this.props.classMates.map((classMate,i) => {
                                return (
                                        <ListItem
                                            button
                                            id="listItem"
                                            onClick={() => this.clickedClassmate(classMate) }
                                            // onClick={this.listItemClicked(i)}
                                            key={i} 
                                            className="listItem">
                                            <ListItemText
                                                primary={classMate.username}
                                            />
                                            <ListItemText
                                                primary={classMate.courseName}
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