import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import {Signup} from './Signup';
import {UserProfile} from './UserProfile/UserProfile';
import clsx from 'clsx';
import ChatIcon from '@material-ui/icons/Chat';
import { signOut } from '../redux/actions/isLogged'
import { withRouter } from 'react-router-dom';
// import {useSelector, useDispatch } from 'react-redux';
import { connect , dispatch} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import socket from '../socket'
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
  },
  title: {
    flexGrow: 1,
    color:'#2daebd',
    fontWeight:'bolder',
    textDecoration:'none',
    fontSize:30,
    marginLeft:theme.spacing(5)
  },
  link:{
    marginLeft:30,
    textDecoration:'none',
    fontSize:20,
    color:'#2daebd',
    fontWeight:'bolder',
  },
  login:{
    borderLeftWidth:2
  },
  navBar:{
    backgroundColor:'white',
    boxShadow:'none',
    position:'sticky',
    top:0
  },
  toolbar: theme.mixins.toolbar,
  bigScreen:{
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  underline:{
    textDecoration:'underline',
    textDecorationColor:'#35578f'
  },
  menuItems:{
    marginRight:theme.spacing(9)
  },
  chat:{
  }
}));

function MenuAppBar(props) {
      const classes = useStyles();
      const [underline,setUnderline] = useState('login')
      const signOut = () => {
        props.history.push('/login')
        localStorage.setItem('state',undefined)
        localStorage.setItem('token','')
        props.signOut();
      }
      useEffect(()=>{
        // const initialUnderline = props.isLogged ? 'Feed' : 'login'
        // to set signup or login to be underlined on nav bar if user changes the uri instead of clicking links.
        let currentPath = props.history.location.pathname
        currentPath = currentPath.substring(1)
        console.log(currentPath=='')
        if(currentPath==''){
          setUnderline('Feed')
        }
        props.setCurrentComponent(currentPath)//for different private message logic if user is in chat or not in chat
        /*
          set footer position on bottom of screen always but for login view, it must be fixed since page height is small
          for every other view, page is scrollable so set the position to be anything but fixed so its below
          and doesn't overlap content.
        */
        if(currentPath=='' || currentPath == 'login'){
          props.setFooterPosition('fixed')
        }else{
          props.setFooterPosition('static')
        }
        setUnderline(currentPath)
      })
      return (
        <div id='navbar' className={classes.root}>
          <AppBar id='navbar' className={classes.navBar} position="static">
            <Toolbar id='navbar'>
              <Typography variant="h6" className={classes.title}>
                Course-Chat
              </Typography>
              <div className={classes.menuItems}>
                {props.isLogged===false && (<Link onClick={()=>setUnderline('signup')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='signup'})} to ="/signup">Sign-Up</Link>)}
                {props.isLogged===false && (<Link onClick={()=>setUnderline('login')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='login'})} to ="/login">Login</Link>)}
                {props.isLogged && <Link onClick={()=>setUnderline('Feed')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='Feed'})} to ="/">Feed</Link>}
                {props.isLogged && <Link onClick={()=>setUnderline('profile')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='profile'})} to ="/profile">Profile</Link>}
                {/* <div className={classes.chat}> */}
                {props.isLogged && <Link onClick={()=>setUnderline('chat')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='chat'})} to ="/chat">Messages</Link>} 
                {/* </div> */}
                {props.isLogged && <Link onClick={()=>setUnderline('login')} className = {clsx({[classes.link]:true,})} to ="/login" onClick={signOut}>LogOut</Link>}
              </div>
              <IconButton edge="start" className={classes.menuButton} color="primary" size='medium' aria-label="menu">
                <MenuIcon color='blue'/>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      );
}


const mapStateToProps = (store) => (
  {
    isLogged:store.logged.loggedIn,//isLogged is now a prop
    allMessages:store.chatters.messages,
    allChatters:store.chatters.chatters,
    user:store.logged.user,
  }
)

function mapDispatchToProps(dispatch){
  return {
    signOut:()=>{
        signOut(dispatch)
    },
    setFooterPosition:(pos)=>{
      dispatch({type:'SET_POSITION',payload:pos})
    },
    addMessage:(message)=>{
      dispatch({
        type:'ADD_MESSAGE',
        payload:message
      })
    },
    setChatters:(chatters)=>{
      dispatch({
        type:'SET_CHATTERS',
        payload:chatters
      })
    },
    setMessages:(messages)=>{
      dispatch({
        type:'SET_MESSAGES',
        payload:messages
      })
    },
    setCurrentComponent:(component)=>{
      dispatch({
        type:'SET_CURRENT_COMPONENT',
        payload:component
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MenuAppBar))//we get signout action from here 

//With router allows your navbar to contain props.history 

// There is a magical higher-order component, that name is withRouter. 
// It takes place in the react-router-dom package also. With its help, you can pass the whole history object 
// to your component as properties. They contains several useful data about routing.