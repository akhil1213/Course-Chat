import React , { useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Box,Container, MenuItem,Select, Input, InputLabel, TextField} from '@material-ui/core'
import {useSelector, useDispatch } from 'react-redux';
import { signIn } from '../actions/isLogged'
import { connect } from 'react-redux';
import { logIn } from '../reducers/isLogged';
//you have to install redux and install react-redux
//i kind of used this website https://serverless-stack.com/chapters/create-a-login-page.html

function Signup(props) {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [college, setCollege] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [collegeError, setCollegeError] = useState('');
    const [errormessage,setErrorMessage] = useState(false);
    const [isLogged,setIsLogged] = useState(false);
    const dispatch = useDispatch();
  function handleClick(e){
    if(!validateForm())
        e.preventDefault();
    else
        props.signIn();
    /*if validatedform is false so its not validated then you prevent the 
    default action from happening which is going to user profile page.*/
  }
  function validateForm(){
    setErrorMessage(true);
      if(fullname.length === 0)
        setFullNameError("fullname is blank");
      else if(email.length === 0){
        setFullNameError("");
        setEmailError("email is empty");
      }
      else if(!validateEmail()){
        setFullNameError("");
        setEmailError("Invalid email format");
      }
      else if(username.length === 0){
        setFullNameError("");
        setEmailError("");
        setUsernameError("Username is empty");
      }
      else if(password.length === 0){
        setFullNameError("");
        setEmailError("");
        setUsernameError("");
        setPasswordError("password is empty");
      }
      else{
        setFullNameError("");
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        setCollegeError("College must be chosen");
      }
    return (username.length > 0 && fullname.length > 0 
      && email.length > 0 && password.length > 0 && 
      college.length > 0 && validateEmail());
  }
  function updateUsername(event) {
    setUsername(event.target.value);
  }
  function updateFName(event) {
    setFullname(event.target.value);
  }
  function updatePassword(event) {
    setPassword(event.target.value);
  }
  function updateEmail(event) {
    setEmail(event.target.value);
  }
  function updateCollege(event) {
    setCollege(event.target.value);
  }
  // updateUsername = (event) => {
  //   this.setState({username: event.target.value});
  //   setUsername(event.target.value);
  // }
  // updateFName = (event) => {
  //   //this.setState({fullname: event.target.value});
  //   setFullname(event.target.value);
  // }
  // updateEmail = (event) => {
  //   //this.setState({email: event.target.value});
  //   setEmail(event.target.value);
  // }
  // updatePassword = (event) => {
  //   //this.setState({password: event.target.value});
  //   setPassword(event.target.value);
  // }
  // updateCollege = (event) => {
  //   //this.setState({college: event.target.value});
  //   setCollege(event.target.value);
  // }
  function validateEmail(){
    //let email = this.state.email;
    const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    console.log(pattern.test(email));
    return pattern.test(email);
  }
      return (
        <div id = "signup" className="App">
          <Container maxWidth="sm">
            <Box className='Box' border={1}borderColor="primary.main">
                <form id="formforsignup">
                  <div className="spaceForInput">
                    <TextField placeholder="Full Name" name="fullname"
                        error={fullNameError.length > 0}
                        label="Full Name"
                        id="standard-error-helper-text"
                        helperText={fullNameError}
                        type="text" 
                        onChange={updateFName}/>
                  </div>
                  <div className="spaceForInput">
                    <TextField label="email" placeholder="E-mail" name="email"
                      type="email"
                      onChange={updateEmail}/>
                      {emailError === 'email is empty' && <div id ="errorlabel">{emailError}</div>}
                      {emailError === 'Invalid email format' && <div id ="errorlabel">Invalid Email Format!</div>}
                  </div>
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
                    />
                    {passwordError.length > 0 && <div id ="errorlabel">{passwordError}</div>}
                  </div>
                  <TextField
                      id="standard-select-currency"
                      select
                      label="Select"
                      name="college"
                      onChange={updateCollege}
                      helperText="Please select your College"
                  >
                    <MenuItem value="Queens College">Queens</MenuItem>
                    <MenuItem value="Hunter College">Hunter</MenuItem>
                    <MenuItem value="Baruch">Baruch</MenuItem>
                  </TextField>
                  {collegeError.length > 0 && <div id ="errorlabel">{collegeError}</div>}
                  <NavLink to={{
                        pathname: '/profile',
                        state:{
                            username:username,
                            fullname:fullname,
                            email:email,
                            password:password,
                            college:college
                        },
                      }} onClick={handleClick} activeStyle={{ color: 'black' }} className="navLink">Submit</NavLink>
                </form>
            </Box>
          </Container>
        </div>
      );
    }
const mapStateToProps = (state) => {
      return {
        isLogged:state.loggedIn
      };
}


export default connect(mapStateToProps, {signIn})(Signup);
