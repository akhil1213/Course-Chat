import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed';
import Signup from './components/Signup';
import Login from './components/login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import UserProfile from './components/UserProfile';
import ClassComponent from './components/ClassComponent'
import Chat from './components/Chat/Chat'
import {useParams} from 'react-router';
// import store from './store'
import {returnErrors} from '../src/redux/actions/errorActions'
import {loadUser} from '../src/redux/actions/isLogged'
import axios from 'axios'
// import React from 'react';
import store from './store'
import {dispatch, connect} from 'react-redux'
class App extends React.Component {
  componentDidMount(){
    console.log("lets get it")
    this.props.loadUser()
  }
  render(){
    return ( 
      <Router>
        <div className="App">
          <Nav />
          <Route path="/" exact component={Feed}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={UserProfile}/>
          <Route path="/class" component={ClassComponent}/>
          <Route path="/chat" component={Chat}/>
        </div>
      </Router>
    );//use exact /signup doesnt bring along feed component
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadUser:()=>{
        loadUser(dispatch)
      }
  }
}
export default connect(null,mapDispatchToProps)(App)
//https://dev.to/rubiin/ubuntu-increase-inotify-watcher-file-watch-limit-kf4