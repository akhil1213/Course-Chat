import Modal from '@material-ui/core/Modal';
import React, { useState } from "react";
import {makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, Button} from '@material-ui/core';
import './Classmates.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { blue, blueGrey } from "@material-ui/core/colors";
import SearchField from './SearchField'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600]
    },
    grow:{
        justifyContent:'flex-end',
        flex:1
        // flex of 1 means the whole width of the div so all the way to the right. flex 0.5 means go half way to the right. 
    },
    listItem:{
        // display:'flex',
        color:blue[700],
        borderBottom:0
    },
    nameUnderUsername:{
        flexGrow:1,
        flexShrink:1,
        flexBasis:'auto',
        width:'100%'
    },
    username:{
        fontWeight:'bold',
        color:blueGrey[900]
    },
    name:{
        color:'gray'
    },
    courseName:{
        color:blue[800]
    },
    titleAndCloseIcon:{
        display:'flex'
    }
});
// var classMates = [{username:'lebron',courseName:'cs343',name:'akhil'}]
export default function ClassmatesModal(props){
        const classes = useStyles();
        const {addChatter,closeModal,modalOpened,classMates} = props
        const [currentlyDisplayed, setCurrentlyDisplayed] = useState(classMates)
        const clickedClassmate = (classMate) =>{
            addChatter(classMate.username)
            closeModal()
        }
        const handleChangeSearchText = (newText) =>{
            const newData = classMates.filter(friend => friend.username.toLowerCase().indexOf(newText.toLowerCase()) != -1)
            setCurrentlyDisplayed(newData);
        }
        return (
            <React.Fragment>
                <Dialog
                    id="dialog"
                    open={modalOpened}
                    onClose={closeModal}
                    fullWidth
                    >
                    <div className={classes.titleAndCloseIcon}>
                        <DialogTitle className={classes.grow} id="simple-dialog-title">New Message</DialogTitle>
                        <Button onClick={() => closeModal()}>
                            <CloseIcon/>
                        </Button>
                        
                    </div>
                    
                    <SearchField handleChangeSearchText={handleChangeSearchText}/>
                    <List>
                    {currentlyDisplayed.map((classMate,i) => {
                                return (
                                        <ListItem
                                            className={classes.listItem}
                                            button
                                            id="listItem"
                                            onClick={() => clickedClassmate(classMate) }
                                            // onClick={listItemClicked(i)}
                                            key={i} 
                                            className="listItem">
                                            <ListItemAvatar>
                                                <Avatar className={classes.avatar}>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <div className={classes.nameUnderUsername}>
                                                <ListItemText
                                                    className={classes.username}
                                                    primary={classMate.username}
                                                />
                                                <ListItemText
                                                    className={classes.name}
                                                    primary={classMate.nameOfUser}
                                                />
                                            </div>
                                            
                                            <ListItemText
                                                primary={classMate.courseName}
                                                className={classes.courseName}
                                            />
                                        </ListItem>
                                )})
                    }
                    </List>
                </Dialog>
            </React.Fragment>
            
        )
}