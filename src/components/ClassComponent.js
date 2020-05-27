import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from 'axios';
import {  connect} from "react-redux";

/*
className:classObject.class,
professorName:classObject.professorName,
time:classObject.time
*/
class ClassComponent extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    students:[]
  }
  componentDidMount() {
    console.log(this.props.classInfo)
    console.log(this.props.classInfo.username)
  }
  render(){
    return (
      <div className="App">
        {this.props.classInfo.courseName}
        <p>{this.props.classInfo.profName}</p>
        <p>{this.props.classInfo.time}</p>
        <p>class component</p>
        <p>Students taking this class!</p>
            <List>
            {this.props.queriedClasses.map((student,i) => {
              return (
                <div>
                {student.username != this.props.classInfo.username && (
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
                                    username:this.props.classInfo.username,
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

const mapStateToProps = (state) => {
  console.log(state)
      return {
          queriedClasses:state.classes.queriedClasses,
          classInfo:state.classes.classInfo
      };
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClassComponent)
