const initialState = {
        chatters:[],
        messages:[],
        notifications:[],
        currentChatter:'',
}
export default function(state = initialState,action){
    switch(action.type){
        case 'ADD_MESSAGE':
            return{
                ...state,
                messages:[...state.messages,action.payload]
            }
        case 'ADD_CHATTER':
            return{
                ...state,
                chatters:[...state.chatters,action.payload]
            }
        case 'SET_CHATTERS':
            return{
                ...state,
                chatters:action.payload
            }
        case 'SET_MESSAGES':
            return{
                ...state,
                messages:action.payload
            }
        case 'SET_CURRENT_CHATTER':
            return{
                ...state,
                currentChatter:action.payload
            }
        case 'ADD_NOTIFICATION':
            return{
                ...state,
                notifications:[...state.notifications,action.payload]
                //splice mutates the array while slice returns a new array with indexes, should never mutate array in redux or react state in general
            }
        case 'REMOVE_NOTIFICATION':
            return{
                ...state,
                notifications:[
                    ...state.notifications.slice(0,action.payload),
                    ...state.notifications.slice(action.payload+1)
                ]
            }
        case 'SET_NOTIFICATIONS':
            return{
                ...state,
                notifications:action.payload
            }
        default:
            return state
    }
 }
    