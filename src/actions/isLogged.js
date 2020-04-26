import { SIGN_IN } from './types';
import { SIGN_OUT } from './types'
import axios from 'axios';
import {returnErrors} from './errorActions'

export function signIn(){
    return {
            type: SIGN_IN,
            //payload:true
    }
}
export function signOut(){
    return {
            type: SIGN_OUT,
            //payload:false
    }
}
export const register = (dispatch,fullName,email,username,password,college) =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({fullName,email,username,password,college})

    axios.post('http://localhost:5000/signup',body,config)
    .then(res => {
        console.log(res.data)
        dispatch({
            type:'REGISTER_SUCCESS',
            payload:res.data
        })
        dispatch({
            type:'SIGN_IN'
        })
        loadUser(dispatch)
    }).catch( (err) => {
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))//register_fail
        dispatch({
            type:'REGISTER_FAIL'
        })
        console.log(err)
    });
}
export const login = (dispatch,username,password) =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({username,password})

    axios.post('http://localhost:5000/login',body,config)
    .then(res => {
        console.log(res.data)
        dispatch({
            type:'LOGIN_SUCCESS',
            payload:res.data
        })
        dispatch({
            type:'SIGN_IN'
        })
        loadUser(dispatch)
    }).catch( (err) => {
        dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))//register_fail
        dispatch({
            type:'LOGIN_FAIL'
        })
        console.log(err)
    });
}

export const loadUser = (dispatch) => {
    // User loading
    dispatch({type: "USER_LOADING"})
    //get token from local storage
    const config = setConfig()
    axios.get("http://localhost:5000/get/user",config)
        .then(res => {
            console.log(res.data[0].username)
            dispatch({type: "USER_LOADED", payload:res.data})
        }).catch(err => {
            console.log(err)
            // dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({type:"AUTH_ERROR"})
        })
}
export const setConfig = () =>{
    const token = localStorage.getItem('token')
    //Headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    if (token){
        config.headers['x-auth-token'] = token;
    }
    return config
}