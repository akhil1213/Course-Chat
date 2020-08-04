const initialState={
    position:'fixed',
    currentComponent:''
}
export default function(state = initialState,action){
    switch(action.type){
        case 'SET_POSITION':
            return{
                ...state,
                position:action.payload
            }
        case 'SET_CURRENT_COMPONENT':
            return{
                ...state,
                currentComponent:action.payload
            }
        default:
            return state
    }
}