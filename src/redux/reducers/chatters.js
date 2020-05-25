const initialState = {
        chatters:[],
        messages:[],
        socketId:''
}
export default function(state = initialState,action){
    switch(action.type){
        case 'UPDATE_CONNECTED_CLIENTS':
            return{
                chatters:action.payload.chatters,
                messages:action.payload.messages,
                socketId:action.payload.socketId
            }
        default:
            return state
    }
 }
    