import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from 'axios';
/*
className:classObject.class,
professorName:classObject.professorName,
time:classObject.time
*/
export default class ClassComponent extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    students:[]
  }
  componentDidMount() {
    console.log(this.props.location.state.username)
    axios.get('http://www.localhost:5000/course/'+this.props.location.state.classId)
    .then( (studentsResponse) => {
        console.log(studentsResponse.data);
        this.setState({students:studentsResponse.data});
    })
    .catch(function (error) {
        console.log(error);
    });
}
  render(){
    return (
      <div className="App">
        {this.props.location.state.className}
        <p>{this.props.location.state.professorName}</p>
        <p>{this.props.location.state.time}</p>
        <p>class component</p>
        <p>Students taking this class!</p>
            <List>
            {this.state.students.map((student,i) => {
              return (
                <div>
                {student.username != this.props.location.state.username && (
                        <ListItem>
                            <ListItemText
                                primary={student.username}
                            /> 
                            {/* should be chatting and view profile icons instead. */}
                            <ListItemSecondaryAction>
                            <Link 
                              to={{
                                pathname: '/chat',
                                state:{
                                    username:this.props.location.state.username,
                                    sendMessageTo:student.username
                                },
                              }}>
                                <IconButton>
                                    <ChatIcon />
                                </IconButton>
                            </Link>
                                <IconButton>
                                    <PersonIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                  )}
                </div>
              )
          })}
          </List>
      </div>
    );
  }
}


