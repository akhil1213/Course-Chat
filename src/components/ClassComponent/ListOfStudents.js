import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { List, ListItem,ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';

//list of students taking specific class.
export default function ListOfClasses({classmates,currentUsername}) {
  console.log(classmates, currentUsername)
    return (
        <List>
            {classmates.map((student,i) => {
              return (
                <div>
                {student.username != currentUsername && (
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
                                    username:currentUsername,
                                    sendMessageTo:student.username
                                },
                              }}
                              >
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
)}


