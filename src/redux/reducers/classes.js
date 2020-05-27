const initialState = {
    classesTaken:[],
    queriedClasses:[],
    classInfo:{}
}
export default function(state = initialState,action){
    switch(action.type){
        case 'ADD_CLASS':
            return{
                ...state,
                classes:[...state.classes,action.payload]
            }
        case 'GET_CLASSES_FROM_DB':
            return{
                ...state,
                classesTaken:action.payload
            }
        case 'GET_QUERIED_CLASSES_FROM_DB':
            return{
                ...state,
                queriedClasses:action.payload
            }
        case 'SET_CLASS':
            return{
                ...state,
                classInfo:action.payload
            }
        default:
            return state
    }
}
