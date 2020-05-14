import { createStore,applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loggedReducer from './redux/reducers/isLogged'
import errorReducer from './redux/reducers/errorReducer'
import chattersReducer from './redux/reducers/chatters'
const middleware = [thunk];
const rootReducer = combineReducers({
    logged:loggedReducer,
    error:errorReducer,
    chatters:chattersReducer
})
// const store = createStore(rootReducer, initialState, 
//         compose(
//             applyMiddleware(...middleware),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         ),
//     );
const store = createStore(rootReducer,applyMiddleware(...middleware));
export default store

