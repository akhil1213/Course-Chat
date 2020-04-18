import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
//import logoimage from '../images/logoimage.jpeg';
class Feed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  handleSubmit(event){
      
  }
  render(){
    return (
      <div className="App">
        <div id = "whatwereabout">
          <div id = "iconandtext">
              <img id = "img"  alt="logo didn't load" />
              <p>Academy square is a platform that allows you to connect with your class mates outside of school in order to better your learning experience</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
