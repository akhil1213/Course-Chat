import React , { useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Box,Container, MenuItem,Select, Input, InputLabel, TextField} from '@material-ui/core'
import {useSelector, useDispatch } from 'react-redux';
// import { signIn } from '../actions/isLogged'
import { connect, dispatch} from 'react-redux';
// import { logIn } from '../reducers/isLogged';
// import {register} from '../actions/isLogged'
import {login} from '../redux/actions/isLogged'
//you have to install redux and install react-redux
//i kind of used this website https://serverless-stack.com/chapters/create-a-login-page.html
import axios from 'axios'
function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errormessage,setErrorMessage] = useState(false);
  const [isLogged,setIsLogged] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  function handleClick(e){
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
      <div id = "signup" className="App">
        <Container maxWidth="sm">
          <Box className='Box' border={1}borderColor="primary.main">
              <form id="formforsignup">
                <p>{props.errorMsg}</p>
                <div className="spaceForInput">
                  <Input
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={updateUsername}
                  />
                  {usernameError.length > 0 && <div id ="errorlabel">{usernameError}</div>}
                </div>
                <div className="spaceForInput">
                  <Input
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={updatePassword}
                    onKeyPress={event => event.key === 'Enter' ? handleClick(event) : null}
                  />
                  {passwordError.length > 0 && <div id ="errorlabel">{passwordError}</div>}
                </div>
                <NavLink to={{
                      pathname: '/',
                      state:{
                          // username:username,
                          // // fullname:fullname,
                          // // email:email,
                          // password:password,
                          // // college:college
                      },
                    }} onClick={handleClick} activeStyle={{ color: 'black' }} className="navLink">Login</NavLink>
              </form>
          </Box>
        </Container>
      </div>
    );
  }
const mapStateToProps = (state) => (
  console.log(state),
      {
        isLoading:state.logged.isLoading,
        isLogged:state.logged.loggedIn,
        errorMsg:state.error.msg.message
      }
)

function mapDispatchToProps(dispatch){
  return {
    login:(history,username,password)=>{
        login(dispatch,history,username,password)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
// export default connect(mapStateToProps, {signIn})(Signup);
