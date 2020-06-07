import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 0px 10px 0px",
    display: "flex",
    alignItems: "center",
    width: '100%',
    borderTopColor:'gray',
    // borderTopWidth:1,
    // borderBottomWidth:1,
    // borderStyle:'solid'
  },
  input: {
    marginLeft: theme.spacing(4),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function SearchDeals(props) {

  const classes = useStyles();
  const {handleChangeSearchText} = props
  return (
    <Box className={classes.root} borderColor="grey.500" borderTop={1} borderBottom={1}>
        <Typography variant="h6">
            To:
        </Typography>
        <InputBase
            className={classes.input}
            placeholder="Search classmates"
            onChange={e => handleChangeSearchText(e.target.value)}
            fullWidth
        />
    </Box>
        
  );
}