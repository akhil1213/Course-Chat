const initialState = {
    currentClasses:[],
    queriedClasses:[],
    classInfo:{},
    classMates:[]
}
export default function(state = initialState,action){
    switch(action.type){
        case 'ADD_CLASS':
            return{
                ...state,
                currentClasses:[...state.currentClasses,action.payload]
            }
        case 'SET_STUDENTS':{
            console.log(action.payload)  
            return{
                ...state,
                classMates:action.payload//action.payload is an array itself so we must use concat
            }
        }
        case 'GET_CLASSES_FROM_DB':
            return{
                ...state,
                currentClasses:action.payload
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
