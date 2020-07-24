import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from 'react-router-dom';
import {Signup} from './Signup';
import {UserProfile} from './UserProfile';
import { signOut } from '../redux/actions/isLogged'
import { withRouter } from 'react-router-dom';
// import {useSelector, useDispatch } from 'react-redux';
import { connect , dispatch} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link:{
    paddingLeft:3,
    textDecoration:'none',
    fontSize:20,
    color:'white',
  },
  navBar:{
    backgroundColor:'#E2E2E2',
    boxShadow:'none'
  },
  menuitem:{
    color:'blue'
  }
}));
const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      // text: { // Name of the rule
        color: 'blue', // Some CSS
      // },
    },
  },
});
function MenuAppBar(props) {
      const classes = useStyles();
      const signOut = () => {
        props.history.push('/login')
        // localStorage.setItem('state',undefined)
        // localStorage.setItem('token','')
        props.signOut();
      }
      return (
        <div className={classes.root}>
          <AppBar className={classes.navBar} position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Course-Chat
              </Typography>
              {/* {auth && ( */}
                <div>
                  {props.isLogged===false && (<Link className = {classes.link}   to ="/signup">Sign up</Link>)}
                  {props.isLogged===false && (<Link className = {classes.link} to ="/login">Login</Link>)}
                  {props.isLogged && <Link className = {classes.link} to ="/profile">Profile</Link>}
                  {props.isLogged && <Link className = {classes.link} to ="/chat">Messages</Link>} 
                  {props.isLogged && <Link className = {classes.link} to ="/signup" onClick={signOut}>LogOut</Link>}

                  <IconButton
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
                  </Menu>
                </div>
              {/* )} */}
            </Toolbar>
          </AppBar>
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