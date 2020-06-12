import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
//import logoimage from '../images/logoimage.jpeg';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Classes from './Classes'
import ClassFeedPage from './ClassFeedPage'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  spaceFromLeft:{
    marginLeft:'5%'
  }
})
function Feed(props) {
    const classes = useStyles()
    const [focusedClass,setFocusedClass] = useState(props.classes[0].courseName)
    // useEffect(() => {
    //   setFocusedClass(props.classes[0].courseName)
    //   console.log(props.classes)
    //   console.log(focusedClass)
    // }, [props.classes]);
    return (
      <div className={classes.spaceFromLeft} >
        <Grid container spacing = {3}>
            <Grid item xs = {3}>
              <Classes focusedClass = {focusedClass} classes = {props.classes} setFocusedClass={setFocusedClass}/>
            </Grid>
            <Grid item xs = {6}>
              <ClassFeedPage focusedClass = {focusedClass}/>
            </Grid>
        </Grid>
        <Divider orientation='vertical' />
      </div>
    );
}



const mapStateToProps = (state) => (
  {
    userData:state.logged.user,
    classes:state.classes.currentClasses
  }
)

export default connect(mapStateToProps,null)(Feed)

