import { createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/isLogged'
const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
