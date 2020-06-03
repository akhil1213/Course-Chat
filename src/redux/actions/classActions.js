import {GET_CLASSES_FROM_DB,SET_CLASS,GET_QUERIED_CLASSES_FROM_DB} from './types'
import axios from 'axios';


export const getClassesForUser = (dispatch,username) =>{
    axios.get(`http://www.localhost:5000/${username}`)
        .then( (response) => {
                dispatch({
                    type:GET_CLASSES_FROM_DB,
                    payload:response.data
                });
                var classes = response.data
                for(var i = 0; i < classes.length; i++){
                    addStudentsForEachClass(dispatch,classes[i]._id,username)
                }
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
}

export const addStudentsForEachClass = (dispatch,classId,username) =>{
    axios.get('http://www.localhost:5000/course/' + classId)
    .then( (studentsResponse) => {
        console.log(studentsResponse.data);
        studentsResponse.data = studentsResponse.data.filter(studInfo => studInfo.username != username)
        console.log(studentsResponse.data)
        dispatch({
            type:'ADD_STUDENTS',
            payload:studentsResponse.data
        })
    })
    .catch(function (error) {
        console.log(error);
    });
}
export const getStudentsForClass = (dispatch,classInfo,id) =>{
    axios.get('http://www.localhost:5000/course/' + id)
    .then( (studentsResponse) => {
        console.log(studentsResponse.data);
        dispatch({
            type:GET_QUERIED_CLASSES_FROM_DB,
            payload:studentsResponse.data
        })
        dispatch({
            type:SET_CLASS,
            payload:classInfo
        })
    })
    .catch(function (error) {
        console.log(error);
    });
}
