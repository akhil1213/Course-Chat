const initialState = {
        chatters:[],
        messages:[],
        notification:[],
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
        default:
            return state
    }
 }
    