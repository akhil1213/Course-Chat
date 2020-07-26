// import React from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import {Typography, makeStyles, List, ListItem, ListItemAvatar, Avatar, FolderIcon, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
// import DeleteIcon from '@material-ui/icons/Delete'
// import EditIcon from '@material-ui/icons/Edit';
// import ChatIcon from '@material-ui/icons/Chat';
// import PersonIcon from '@material-ui/icons/Person';
// import AddBoxIcon from '@material-ui/icons/AddBox';
// import axios from 'axios';
// import {  connect} from "react-redux";
// import ListOfStudents from "./ListOfStudents"
// /*
// className:classObject.class,
// professorName:classObject.professorName,
// time:classObject.time
// */
// const styles = makeStyles(theme => ({
//   header:{
//     textAlign:'center'
//   }
// })); 
// function ClassComponent({classInfo,queriedClassMates}) {
//     const classes = styles()
//     return (
//       <div className="App">
//         <div className={classes.header}>
//           <Typography variant='h1'>
//           {classInfo.courseName}
//         </Typography>
//           <Typography variant='h2'>
//             {classInfo.profName}
//           </Typography>
//           <Typography variant='h3'>
//             {classInfo.time}
//           </Typography>
//         </div>
        
//         <ListOfStudents classmates={queriedClassMates} currentUsername={classInfo.username}/>
//       </div>
//     );
//   }


// const mapStateToProps = (state) => {
//   console.log(state)
//       return {
//           queriedClassMates:state.classes.queriedClassMates,
//           classInfo:state.classes.classInfo
//       };
// }

// function mapDispatchToProps(dispatch){
//   return {

//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(ClassComponent)
