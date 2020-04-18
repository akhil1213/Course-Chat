import React from 'react';
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
import { signOut } from '../actions/isLogged'

import { connect } from 'react-redux';
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
}));

 function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleChange = event => {
    setAuth(event.target.checked);
    if(!event.target.checked){
      props.signOut();
    }
  };
  const signOut = () => {
    props.signOut();
  }
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        {props.isLogged && (
          <FormControlLabel
            control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
            label={auth ? 'Logout' : 'Login'}
          />
        )
        }
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Course-Chat
          </Typography>
          {/* {auth && ( */}
            <div>
              {props.isLogged===false && (<Link to ="/signup">Sign up</Link>)}
              {props.isLogged && <Link to ="/signup" onClick={signOut}>Log Out</Link>}
              {props.isLogged && <Link to ="/profile">Profile</Link>}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {props.isLogged && <MenuItem onClick={signOut}><Link to ="/signup">Log Out</Link></MenuItem>}
                <MenuItem onClick={handleClose}><Link to ="/signup">Sign up</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to ="/profile" >User Profile</Link></MenuItem>
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
    isLogged:store.loggedIn//isLogged is now a prop
})
export default connect(mapStateToProps,{signOut})(MenuAppBar)//we get signout action from here 


