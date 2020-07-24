import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import {Signup} from './Signup';
import {UserProfile} from './UserProfile';
import clsx from 'clsx';

import { signOut } from '../redux/actions/isLogged'
import { withRouter } from 'react-router-dom';
// import {useSelector, useDispatch } from 'react-redux';
import { connect , dispatch} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    color:'#2daebd'
  },
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
    boxShadow:'none'
  },
  toolbar: theme.mixins.toolbar,
  bigScreen:{
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  underline:{
    border:2,
    padding:4,
    borderBottomWidth:3,
    borderBottomColor:'purple',
    borderBottomStyle:'',
    backgroundColor:'black'
  }
}));

function MenuAppBar(props) {
      const classes = useStyles();
      const [underline,setUnderline] = useState('login')
      const signOut = () => {
        props.history.push('/login')
        // localStorage.setItem('state',undefined)
        // localStorage.setItem('token','')
        props.signOut();
      }
      useEffect(()=>{
        //to set signup or login to be underlined on nav bar if user changes the uri instead of clicking links.
        let currentPath = props.history.location.pathname
        currentPath = currentPath.substring(1)
        if(currentPath == 'signup' || currentPath == 'login' ) setUnderline(currentPath)
      },[])
      return (
        <div className={classes.root}>
          <AppBar className={classes.navBar} position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Course-Chat
              </Typography>
                {props.isLogged===false && (<Link onClick={()=>setUnderline('signup')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='signup'})} to ="/signup">Sign-Up</Link>)}
                {props.isLogged===false && (<Link onClick={()=>setUnderline('login')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='login'})} to ="/login">Login</Link>)}
                {props.isLogged && <Link onClick={()=>setUnderline('profile')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='profile'})} to ="/profile">Profile</Link>}
                {props.isLogged && <Link onClick={()=>setUnderline('chat')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='chat'})} to ="/chat">Messages</Link>} 
                {props.isLogged && <Link onClick={()=>setUnderline('login')} className = {clsx({[classes.link]:true,[classes.underline]:underline==='login'})} to ="/login" onClick={signOut}>LogOut</Link>}

                {/* <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

                <Menu>
                <MuiThemeProvider theme={theme}>
                  {props.isLogged && <MenuItem onClick={signOut}><Link to ="/signup">Log Out</Link></MenuItem>}
                  <MenuItem classes={{ root: 'menu-item', selected: 'selected' }}><Link to ="/signup">Sign up</Link></MenuItem>
                  <MenuItem style={{backgroundColor: 'red', color: 'white'}} ><Link to ="/profile" >User Profile</Link></MenuItem>
                </MuiThemeProvider>
                </Menu> */}
              <IconButton edge="start" className={classes.menuButton} color="primary" size='medium' aria-label="menu">
                <MenuIcon color='blue'/>
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* <div>
            <div className={classes.toolbar} />
            <List>
              {props.isLogged===false && (<ListItem><Link className = {[classes.link]}   to ="/signup">Sign-Up</Link></ListItem>)}
              {props.isLogged===false && (<ListItem><Link className = {[classes.link]} to ="/login">Login</Link></ListItem>)}
              {props.isLogged && <ListItem><Link className = {classes.link} to ="/profile">Profile</Link></ListItem>}
              {props.isLogged && <ListItem><Link className = {classes.link} to ="/chat">Messages</Link></ListItem>} 
              {props.isLogged && <ListItem><Link className = {classes.link} to ="/signup" onClick={signOut}>LogOut</Link></ListItem>}
            </List>
          </div> */}
        </div>
      );
}


const mapStateToProps = (store) => (
  console.log(store),{
    isLogged:store.logged.loggedIn//isLogged is now a prop
})

function mapDispatchToProps(dispatch){
  return {
    signOut:()=>{
        signOut(dispatch)
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MenuAppBar))//we get signout action from here 

//With router allows your navbar to contain props.history 

// There is a magical higher-order component, that name is withRouter. 
// It takes place in the react-router-dom package also. With its help, you can pass the whole history object 
// to your component as properties. They contains several useful data about routing.