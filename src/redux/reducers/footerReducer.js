const initialState={
    position:'fixed'
}
export default function(state = initialState,action){
    switch(action.type){
        case 'SET_POSITION':
            console.log(action.payload)
            return{
                ...state,
                position:action.payload
            }
        default:
            return state
    }
}