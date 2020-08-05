import { SIGN_IN } from './types';
import { SIGN_OUT } from './types'
import axios from 'axios';
import {returnErrors} from './errorActions'
import jwt_decode from "jwt-decode";
import {getClassesForUser} from './classActions'
import { uri } from '../../uri'
import getMessagesAndChatters from './messageActions';
export function signIn(){
    return {
            type: SIGN_IN,
            //payload:true
    }
}
export function signOut(dispatch){
    dispatch({
            type: SIGN_OUT,
            //payload:false
    })
    dispatch({
        type: 'LOGOUT_SUCCESS',
        //payload:false
    })
    

}
export const login = (dispatch,history,username,password) =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({username,password})

    axios.post(`${uri}users/login`,body,config)
    .then(res => {
        dispatch({
            type:'LOGIN_SUCCESS',
            payload:res.data
            //gets user token after logging in and same for sign up.
        })
        getClassesForUser(dispatch,username)
        getMessagesAndChatters(dispatch,username)
        dispatch({
            type:'SIGN_IN'
        })
        loadUser(dispatch,history)//gets user information.
        
    }).catch( (err) => {
        console.log(err.response)
        dispatch(returnErrors(err.response.data.message,err.response.status,'LOGIN_FAIL'))//register_fail
        dispatch({
            type:'LOGIN_FAIL'
        })
    });
}
export const register = (dispatch,history,fullName,email,username,password,college) =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({fullName,email,username,password,college})

    axios.post(`${uri}users/signup`,body,config)
    .then(res => {
        console.log(res.data)
        const {token } = res.data
        dispatch({
            type:'REGISTER_SUCCESS',
            payload:res.data[0]
        })
        dispatch({
            type:'SIGN_IN'
        })
        // const user = jwt_decode(token)
        // console.log(user)
        // dispatch(setCurrentUser(user));
        loadUser(dispatch,history)
        
    }).catch( (err) => {
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))//register_fail
        dispatch({
            type:'REGISTER_FAIL'
        })
        console.log(err.response.data.message)
    });
}
export const setCurrentUser = decoded => {
    return {
      type: 'USER_LOADED',
      payload: decoded
    };
  };
export const loginWorked = (dispatch,res) =>{
    dispatch({
        type:'LOGIN_SUCCESS',
        payload:res.data
    })
    dispatch({
        type:'SIGN_IN'
    })
    loadUser(dispatch)
}
export const loginFailed = (dispatch,err) => {
    dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))//register_fail
    dispatch({
        type:'LOGIN_FAIL'
    })
    console.log(err.response.data)
}
export const loadUser = (dispatch,history) => {
    const config = setConfig()
    axios.get(`${uri}users/get/user`,config)
        .then(res => {
            console.log(res.data)
            dispatch({type: "USER_LOADED", payload:res.data})
            history.push('/')
        }).catch(err => {
            console.log(err)
            // dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({type:"AUTH_ERROR",payload:err})
        })
}
export const setConfig = () =>{
    const token = localStorage.getItem('token')
    console.log(token)
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    if (token){
        console.log(token)
        config.headers['x-auth-token'] = token;
    }
    return config
}