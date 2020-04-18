import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../App';
import * as serviceWorker from '../serviceWorker';
import {createStore} from 'redux';
import loggedReducer from '../reducers/isLogged'
import { Provider } from 'react-redux';//provider connects our global states from our store to our entire app.
//import { store } from './store'
//now the whole app has access to the store 
const store = createStore(loggedReducer);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
