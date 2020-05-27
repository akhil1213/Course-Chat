import {GET_CLASSES_FROM_DB,SET_CLASS,GET_QUERIED_CLASSES_FROM_DB} from './types'
import axios from 'axios';

export const getClassesForUser = (dispatch,username) =>{
    axios.get(`http://www.localhost:5000/${username}`)
        .then( (response) => {
            dispatch({
                type:GET_CLASSES_FROM_DB,
                payload:response.data});
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
