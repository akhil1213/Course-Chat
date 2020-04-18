const SIGN_IN = 'SIGN_IN';
const initialState = {
    loggedIn:false
}
export default function(state = initialState,action){
    switch(action.type){
        case SIGN_IN:
            return {loggedIn:true};
        case 'SIGN_OUT':
            return {loggedIn:false};
        default:
            return state;
    }
}