import React , {useState} from 'react';
import TextField from '@material-ui/core/TextField';



export default function Feed(props) {

    return (
      <div className="App">
          <div>feed for class {props.focusedClass}</div>
          <TextField
          id="outlined-multiline-static"
          multiline
          fullWidth
          placeholder={`Add a post for ${props.focusedClass}`}
          rows={4}
          defaultValue=""
          variant="outlined"
        />
      </div>
    );
}




