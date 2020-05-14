const initialState = {
    connectedClients:{
        chatters:[],
        messages:[],
        socketId:''
    }
}
export default function(state = initialState,action){
    switch(action.type){
        case 'UPDATE_CONNECTED_CLIENTS':
            return{
                ...state,
                connectedClients:action.payload
            }
        default:
            return state
    }
 }
    