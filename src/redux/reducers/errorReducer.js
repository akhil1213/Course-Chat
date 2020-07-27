const initialState = {
    msg:'',
    status:null,
    id:null
}
export default function(state = initialState,action){
    switch(action.type){
        case 'GET_ERRORS':
            console.log(action.payload)
            return{
                ...state,
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        case 'CLEAR_ERRORS':
            return{
                ...state,
                msg:'',
                status:null,
                id:null
            }
        default:
            return state
    }
}
    
