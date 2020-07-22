const SIGN_IN = 'SIGN_IN';
const initialState = {
    loggedIn:false,
    classes:[],
    token:localStorage.getItem("token"),
    isLoading:false,
    user:null,
}
export default function(state = initialState,action){
    switch(action.type){
        case SIGN_IN:
            return {loggedIn:true};
        case 'SIGN_OUT':
            return {loggedIn:false};
        case 'ADD_CLASS':
            return {
                classes: [
                    ...state.classes,
                    action.payload,
                  ]
            }
        case 'USER_LOADING':
            return {
                ...state,
                isLoading:true
            }
        case 'USER_LOADED':
            return{
                ...state,
                loggedIn:true,
                isLoading:false,
                user:action.payload
                //get user info from action.payload!
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,//contains our token
                loggedIn:true,
                isLoading:false,
                user:action.payload
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                user:null,
                loggedIn:false,
                isLoading:false
            }
        default:
            return state;
    }
}
// const initialState = {
//     commentText:'',
//     comments:[]
//  }
//  const reducer = (state = initialState,action) => {
//     console.log(action.payload)
//     switch(action.type){
//        case 'ADD_COMMENT':
//           return  {
        //   comments: [
        //     ...state.comments,
        //     {
        //       commentInfo: action.payload,
        //     }
        //   ]
//        }
//         case 'LIKE_COMMENT':
//            return{
//               comments:action.payload
//            }
//        }
//     return state
//  }
//  const Store = createStore(reducer)