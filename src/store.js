import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/isLogged'
// const initialState = {};
import loggedReducer from './reducers/isLogged'


const middleware = [thunk];

// const store = createStore(rootReducer, initialState, 
//         compose(
//             applyMiddleware(...middleware),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         ),
//     );
const store = createStore(loggedReducer,applyMiddleware(...middleware));
export default store

