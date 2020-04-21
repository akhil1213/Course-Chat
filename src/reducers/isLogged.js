const SIGN_IN = 'SIGN_IN';
const initialState = {
    loggedIn:false,
    classes:[]
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