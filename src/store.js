import { createStore,applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loggedReducer from './redux/reducers/isLogged'
import errorReducer from './redux/reducers/errorReducer'
import chattersReducer from './redux/reducers/chatters'
import classesReducer from './redux/reducers/classes'
const middleware = [thunk];
const rootReducer = combineReducers({
    logged:loggedReducer,
    error:errorReducer,
    chatters:chattersReducer,
    classes:classesReducer
})
// const store = createStore(rootReducer, initialState, 
//         compose(
//             applyMiddleware(...middleware),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         ),
//     );
// const store = createStore(
//     reducer, /* preloadedState, */
//  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
const store = createStore(rootReducer,applyMiddleware(...middleware)
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store

