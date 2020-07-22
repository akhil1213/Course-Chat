
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';

//import logoimage from '../images/logoimage.jpeg';
const useStyles = makeStyles({
    focused:{
        backgroundColor:'gray'
    },
    // unfocused:{
    //     backgroundColor:'gray'
    // },
    paper: {
        // padding: theme.spacing(1),
        marginTop:'4%',
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        // marginBottom: theme.spacing(1),
    },
    textcenter:{
        textAlign:'center'
    }
})
export default function Classes(props){
    const classes = useStyles()
    return (
      <div className="App">
        <Paper className={classes.paper}>
            <List>
            {props.classes.map( (classObject,i) => {
                return(
                <ListItem
                    onClick = {() => props.setFocusedClass(classObject.courseName)}
                    key={i}
                    className = {props.focusedClass == classObject.courseName ? classes.focused : 'unfocused'}
                >
                    <ListItemText
                        primary={classObject.courseName}
                        className={classes.textcenter}
                    />
                </ListItem>
                )
            })}
            </List>
        </Paper>
        
      </div>
    );
}
