import React , { useState, useEffect } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Typography, Box,Container, MenuItem,Select, Input, InputLabel, TextField, Button} from '@material-ui/core'
import {useSelector, useDispatch } from 'react-redux';
// import { signIn } from '../actions/isLogged'
import { connect, dispatch} from 'react-redux';
// import { logIn } from '../reducers/isLogged';
// import {register} from '../actions/isLogged'
import {login} from '../redux/actions/isLogged'
import {clearErrors} from '../redux/actions/errorActions'
//you have to install redux and install react-redux
//i kind of used this website https://serverless-stack.com/chapters/create-a-login-page.html
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  width:{
    width:'30%'
  },
  button:{
    background: '#35578f',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #33435e',
    color: 'white',
    marginTop:30,
    height:'50px',
    textDecoration:'none',
    display:'block',
    textAlign:'center',
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      background: '#33435e'
    }
  },
  textfield:{
    marginTop:20
  },
  header:{
    marginTop:60
  },
})
)
function Login(props) {
  const classes = useStyles()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errormessage,setErrorMessage] = useState(false);
  const [isLogged,setIsLogged] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    props.clearErrors()
  },[])
  function handleClick(e){
    props.clearErrors()
    if(!validateForm())
        e.preventDefault();
    else{
        e.preventDefault()
        props.login(props.history,username,password);//signup
        console.log(props.errorMsg)
    }
        //send user to mongodb using axios. 
    /*if validatedform is false so its not validated then you prevent the 
    default action from happening which is going to user profile page.*/
  }
function validateForm(){
      setErrorMessage(true);
      let validPW=validatePassword()
      if(username.length === 0){
          setUsernameError("Username is empty");
      }
      else if(password.length === 0){
          setUsernameError("");
          setPasswordError("password is empty");
      }else if(password.length < 7 ){
          setUsernameError("");
          setPasswordError("password needs to be more then eight characters")
      }else if(!validPW){
          setUsernameError("");
          setPasswordError("password needs at least one digit and one uppercase")
      }
      return (password.length >= 7  && validPW);
}
function updateUsername(event) {
  setUsername(event.target.value);
}
function updatePassword(event) {
  setPassword(event.target.value);
}
function validatePassword(){
  //let email = this.state.email;
  let upperCase = 0;
  let digit = 0;
  for(var i = 0; i < password.length; i++){
      let currentChar = password.charAt(i)
      if(currentChar == currentChar.toUpperCase()) upperCase++;
      const pattern = new RegExp(/^[\d]$/);
      if (pattern.test(currentChar)) digit++;
  }
  if(digit > 0 && digit < password.length && upperCase > 0 && upperCase < password.length ) return true
  return false;
}
    return (
      <div className={classes.container}>
        <Typography className={classes.header} variant = "h4">
          Welcome back!
        </Typography>
        <div className={classes.width}>
          <div id="errorlabel">{props.errorMsg}</div>
          <div className="spaceForInput">
            <TextField
              placeholder="Enter Username*"
              name="username"
              type="text"
              variant="outlined"
              fullWidth
              className={classes.textfield}
              onChange={updateUsername}
            />
            {usernameError.length > 0 && <div id ="errorlabel">{usernameError}</div>}
          </div>
          <div className="spaceForInput">
            <TextField
              placeholder="Enter Password*"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={updatePassword}
              className={classes.textfield}
              onKeyPress={event => event.key === 'Enter' ? handleClick(event) : null}
            />
            {passwordError.length > 0 && <div id ="errorlabel">{passwordError}</div>}
          </div>
          <NavLink to={{
                pathname: '/',
              }} style={{textDecoration:'none'}} onClick={handleClick}>
              <Button fullWidth className={classes.button}>
                Login
              </Button>
          </NavLink>
        </div>
      </div>
      
    );
  }
const mapStateToProps = (state) => (
  console.log(state),
      {
        isLoading:state.logged.isLoading,
        isLogged:state.logged.loggedIn,
        errorMsg:state.error.msg
      }
)

function mapDispatchToProps(dispatch){
  return {
    login:(history,username,password)=>{
        login(dispatch,history,username,password)
    },
    clearErrors:()=>{
      dispatch(clearErrors())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
// export default connect(mapStateToProps, {signIn})(Signup);
