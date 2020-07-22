import { createStore,applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loggedReducer from './redux/reducers/isLogged'
import errorReducer from './redux/reducers/errorReducer'
import chattersReducer from './redux/reducers/chatters'
import classesReducer from './redux/reducers/classes'

const middleware = [thunk];
const appReducer = combineReducers({
    logged:loggedReducer,
    error:errorReducer,
    chatters:chattersReducer,
    classes:classesReducer
})
const rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
        state = undefined
    }
    return appReducer(state, action)
}
function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e)
    }
}
function loadFromLocalStorage(){
    try{
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch(e){
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()
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
const store = createStore(rootReducer,persistedState,applyMiddleware(...middleware));
store.subscribe(() => saveToLocalStorage(store.getState()))
export default store

