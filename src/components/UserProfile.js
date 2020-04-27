import React from 'react';
import {makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuid from 'uuid'
import {connect,dispatch} from 'react-redux'
//import logoimage from '../images/logoimage.jpeg';

//how to pass a link to listitem component onclick https://stackoverflow.com/questions/47206639/how-to-add-a-link-to-a-list-in-material-ui-1-0
//https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpened:false,
            profName:'',
            class:'',
            time:'',
            classes:[]
        };
    }
    openModal = () => {
        this.setState({isModalOpened:true});
        console.log(this.state.isModalOpened);
    }
    closeModal = () =>{
        this.setState({isModalOpened:false})
        console.log(this.state.isModalOpened);
        // need to refresh the component since the state changed
    }
    componentDidMount() {
        /*code disables user to go back since going back would allow the user 
        to go back to the signup page but the user already signed up.*/
        // if(this.props.location.state.username!= null){
        //     const {username,fullName, college, email} = this.props.location.state
        // }else{
        //     const {username,fullName, college, email} = this.props.userData[0]
        // }
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
        axios.get('http://www.localhost:5000/'+this.props.userData[0].username)
        .then( (response) => {
            console.log("akhil")
            console.log(response.data);
            this.setState({classes:response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    updateProfessorname = (event) => {
        this.setState({profName: event.target.value});
    }
    updateClass = (event) => {
        this.setState({class: event.target.value});
    }
    updateTime = (event) => {
        this.setState({time: event.target.value});
    }
    addClass = () => {
        const newClass = {
            courseName:this.state.class,
            profName:this.state.profName,
            time:this.state.time,
            username:this.props.userData[0].username
        };
        this.state.classes.push(newClass);
        this.setState({classes:this.state.classes});

        axios.post('http://localhost:5000/',{
            courseName:this.state.class,
            profName:this.state.profName,
            time:this.state.time,
            username:this.props.userData[0].username
        }).then().catch( (error) => {
            console.log(error);
        });
        // const conf = {
        //     method: "post",
        //     body: JSON.stringify(newClass),
        //     headers: new Headers({ "Content-Type": "application/json" })
        //   };
        // fetch('/api/courses/', conf).catch().then(response => console.log(response));
        this.setState({isModalOpened:false});
    }
    //console.log("profile",this.props.location.state.username);
    listItemClicked = (i) => {
        console.log(i);
    }
    render(){
        return(
            <div className="App" id ="parentDiv">
                <div id = "nameandcollegeandimage">
                    <div id = "displayflexrow">
                        <div id = "profileimage">
                            <img></img>
                        </div>
                        <div id = "nameandcollege">
                            <div id = "fullname">
                                <p>{this.props.userData[0].fullName}</p>
                            </div>
                            <div id = "college">
                                <p>Student @ {this.props.userData[0].college}</p>
                            </div>
                        </div>
                    </div>
                    <p>The username is {this.props.userData[0].username}</p>
                    <p>Your current email set is:{this.props.userData[0].email}</p>
                </div>
                    <div id = "listItems">
                    <List id = "list">
                        <ListItem className ="listItem" id = "topRowOfList">
                            <ListItemText
                                primary="Class Name"
                            />
                            <ListItemText
                                primary="Professor Name"
                            />
                            <ListItemText
                                primary="Time Taken"
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.openModal}>
                                    <AddBoxIcon/>
                                </IconButton>
                                <Dialog open={this.state.isModalOpened} onClose={this.closeModal} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Enter a Class</DialogTitle>
                                    <DialogContent>
                                        {/* After debugging for an hour , the dialog should not be inside
                                         icon button because inside the dialog there is a cancel button and for some reason icon buttons onclick method
                                         kept overriding the child button of dialog's onclick method. */}
                                    <DialogContentText>
                                        Enter the class name, professor name, and time below:
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="classname"
                                        label="Class name:"
                                        type="text"
                                        fullWidth
                                        onChange={this.updateClass}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="professor name"
                                        label="Professor name:"
                                        type="text"
                                        fullWidth
                                        onChange={this.updateProfessorname}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="time"
                                        label="Time"
                                        type="time"
                                        fullWidth
                                        onChange={this.updateTime}
                                    />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.closeModal} color="primary">
                                            Cancel
                                        </Button>
                                        <Button  onClick={this.addClass} color="primary">
                                            Add Class
                                        </Button>
                                    </DialogActions>
                                    </Dialog>
                            </ListItemSecondaryAction>
                        </ListItem>
                            {this.state.classes.map((classObject,i) => {
                                return (
                                        <ListItem
                                            button
                                            id="listItem"
                                            component={Link}//the list item is now a Link element so u can pass a to prop for the link
                                            to={{
                                                pathname: '/class',
                                                state:{
                                                    classId:classObject._id,
                                                    className:classObject.courseName,
                                                    profName:classObject.profName,
                                                    time:classObject.time,
                                                    username:this.props.userData[0].username
                                                },
                                              }}
                                            onClick={() => { console.log('onClick'); }}
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
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })
                            }
                    </List>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => (
    console.log(store),{
      userData:store.logged.user
    })

export default connect(mapStateToProps,null)(UserProfile)

//Graphql,redis, mern stack, mongodb, 
//graphql is for complicated queries