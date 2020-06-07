import {GET_CLASSES_FROM_DB,SET_CLASS,GET_QUERIED_CLASSES_FROM_DB} from './types'
import axios from 'axios';

function sortAndGetRidOfDuplicates(allStudentsInAllClasses){
    allStudentsInAllClasses.sort(function(a,b){
        var usernameA = a.username.toUpperCase(); // ignore upper and lowercase
        var usernameB = b.username.toUpperCase(); // ignore upper and lowercase
        if (usernameA < usernameB) {
          return -1;//this means a comes first.
        }
        if (usernameA > usernameB) {
          return 1;//this means b comes first
        }
        return 0;
      })
      console.log(allStudentsInAllClasses)
      var i = 0;
      for(let j =1; j < allStudentsInAllClasses.length; j++){
        if(allStudentsInAllClasses[j].username!=allStudentsInAllClasses[i].username){
          i++;
          allStudentsInAllClasses[i]=allStudentsInAllClasses[j]
        }
      }
      // all elements preceding i are unique and after i are duplicates so we splice after i
      while(i + 1 < allStudentsInAllClasses.length) allStudentsInAllClasses.splice(i+1)
      console.log(allStudentsInAllClasses)
      return allStudentsInAllClasses
}

export const getClassesForUser = (dispatch,username) =>{
    axios.get(`http://www.localhost:5000/${username}`)
        .then( async (response) => {
                dispatch({
                    type:GET_CLASSES_FROM_DB,
                    payload:response.data
                });
                var classes = response.data
                var waitForAsync = []
                for(var i = 0; i < classes.length; i++){
                    waitForAsync.push(axios.get('http://www.localhost:5000/course/' + classes[i]._id)//queries all students taking this specific course. need to change the name of route later.
                    .then( (studentsResponse) => {
                        return studentsResponse.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    }))
                }
                Promise.all(waitForAsync).then( (students) =>{
                    let allStudents = [].concat(...students)
                    allStudents = sortAndGetRidOfDuplicates(allStudents)
                    //students can take multiple courses together and we are querying for each class so here can be duplicated classmates
                    allStudents.filter(studInfo => studInfo.username != username)//current user's classmates don't include himself by definition.
                    dispatch({
                        type:'SET_STUDENTS',
                        payload:allStudents
                    })
                })
            }).catch(function (error) {
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
