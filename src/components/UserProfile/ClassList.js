import React from 'react';
import {withStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';



export default function ClassList({username,classes,getStudents,deleteClass}){
    return(
        classes.map((classObject,i) => {
            return (
                    <ListItem
                        button
                        id="listItem"
                        component={Link}//the list item is now a Link element so u can pass a to prop for the link
                        // to={{
                        //     pathname: '/class',
                        //     state:{
                        //         classId:classObject._id,
                        //         className:classObject.courseName,
                        //         profName:classObject.profName,
                        //         time:classObject.time,
                        //         username:username
                        //     },
                        // }}
                        onClick={() => {getStudents(classObject,classObject._id) }}
                        // onClick={this.listItemClicked(i)}
                        key={i} 
                        className="listItem">
                        <ListItemText
                            primary={classObject.courseName}
                        />
                        <ListItemText
                            primary={classObject.profName}
                        />
                        <ListItemText
                            primary={classObject.time}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={()=>{deleteClass(classObject._id)}}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })
    )
    
    }