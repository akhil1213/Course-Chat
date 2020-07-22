const initialState = {
        chatters:[],
        messages:[],
        socketId:''
}
export default function(state = initialState,action){
    switch(action.type){
        case 'set_messages_and_chatters_from_db':
            return{
                chatters:action.payload.chatters,
                messages:action.payload.messages,
            }
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
        default:
            return state
    }
 }
    