import React from 'react';
import {Divider,Grid, withStyles, Typography, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
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
import { bindActionCreators, compose } from 'redux';
import {addClass, getStudentsForClass, getClassesForUser} from '../../redux/actions/classActions'
import Paper from '@material-ui/core/Paper'
import iconpic from "../../assets/suite.png";
import ClassList from './ClassList'
import blm from '../../assets/blm.jpeg'
import Box from '@material-ui/core/Box';
import ListOfStudents from '../ClassComponent/ListOfStudents'
//import logoimage from '../images/logoimage.jpeg';

//how to pass a link to listitem component onclick https://stackoverflow.com/questions/47206639/how-to-add-a-link-to-a-list-in-material-ui-1-0
//https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4
const useStyles = (theme) => ({
    avatar: {
      height:100,
      width:110
    },
    paper:{
        marginLeft:15,
        marginTop:40
    },
    infocontainer:{
        display:'flex',
        justifyContent:'space-between'
    },
    classList:{
        marginTop:8
    },
    infoleft:{
        marginLeft:15,
        display:'flex',
        flexDirection:'column',
        marginTop:-35,
    },
    extraInfo:{
        display:'flex',
        marginBottom:20
    },
    extras:{
        marginLeft:8
    },
    image:{
        height:300,
        width:'100%',
        border:'2'
    },
    header:{
        textAlign:'center'
    }
});
class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpened:false,
            profName:'',
            class:'',
            time:'',
            classes:this.props.classess//because classes prop from material ui was overriden by redux classes prop so I changed var names
        };
        this.styles = useStyles();
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
            username:this.props.userData.username
        };
        this.state.classes.push(newClass);
        this.setState({classes:this.state.classes});
        axios.post('http://localhost:5000/classes/',{
            courseName:this.state.class,
            profName:this.state.profName,
            time:this.state.time,
            username:this.props.userData.username,
            nameOfUser:this.props.userData.fullName
        }).then().catch( (error) => {
            console.log(error);
        });
        this.setState({isModalOpened:false});
    }
    delete = (id) =>{
        console.log(id)
        axios.delete(`http://localhost:5000/${id}`).then().catch( (error)=> console.log(error))
    }
    render(){
        console.log(this.props)
        return(
            <Grid container >
                <Grid container md={8}  direction='column'>
                    <Paper variant='outlined' className={this.props.classes.paper}>
                        <img src={blm} className={this.props.classes.image}></img>
                        <div className={this.props.classes.infocontainer}>
                            <div className={this.props.classes.infoleft}>
                                <Avatar src={iconpic} id='avatar' className={this.props.classes.avatar} />
                                <Typography variant='h6'>{this.props.userData.fullName}</Typography>
                                <Typography variant='h6'>Student @ {this.props.userData.college}</Typography>
                                <div className={this.props.classes.extraInfo}>
                                    <Typography variant='h6'>Flushing,NY</Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography className={this.props.classes.extras} variant='h6'>{this.props.classess.length} classes</Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography className={this.props.classes.extras} variant='h6'>{this.props.classess.length} queriedClassMates</Typography>
                                </div>
                            </div>
                            <div className={this.props.classes.inforight}>

                                <EditIcon/>
                            </div>
                        </div>
            {/*{this.props.userData.college.substring(this.props.userData.college.length-6,this.props.userData.college.length)!=='college' ? 'college'}*/}
                    </Paper>
                    <Paper className={this.props.classes.paper}>
                        <List className={this.props.classes.classList}>
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
                                            margin="dense"
                                            id="professor name"
                                            label="Professor name:"
                                            type="text"
                                            fullWidth
                                            onChange={this.updateProfessorname}
                                        />
                                        <TextField
                                            
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
                            <ClassList username = {this.props.userData.username} classes = {this.state.classes} getStudents={this.props.getStudentsForClass} deleteClass={this.delete} />
                        </List>
                    </Paper>
            </Grid>
            <Grid md={4}>
                <Paper variant='outlined' className={this.props.classes.paper}>
                    <Typography className={this.props.classes.header} variant='h6'>Students for {this.props.classInfo.courseName}</Typography>
                    <ListOfStudents classmates={this.props.queriedClassMates} currentUsername={this.props.classInfo.username}/>
                </Paper>
            </Grid>
        </Grid>
                    
        );
    }
}

const mapStateToProps = (state) => (
    {
      userData:state.logged.user,
      classess:state.classes.currentClasses,
      queriedClassMates:state.classes.queriedClassMates,
      classInfo:state.classes.classInfo
    }
)
function mapDispatchToProps(dispatch){
    return {
        getStudentsForClass:(classInfo,id)=>{
            console.log(classInfo)
            getStudentsForClass(dispatch,classInfo,id)
        },
    }
}
      
    

// export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles,{withTheme:true})(UserProfile))
// export default connect(mapStateToProps,mapDispatchToProps)((withStyles(useStyles)(UserProfile)));

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
  )(UserProfile);