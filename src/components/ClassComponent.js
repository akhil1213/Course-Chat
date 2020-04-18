import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

/*
className:classObject.class,
                                                    professorName:classObject.professorName,
                                                    time:classObject.time
                                                    */
export default class ClassComponent extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="App">
        {this.props.location.state.className}
        <p>{this.props.location.state.professorName}</p>
        <p>{this.props.location.state.time}</p>
        <p>class component</p>
      </div>
    );
  }
}


