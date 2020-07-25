import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import './InfoBar.css';

const InfoBar = ({ room, openModal }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <Button onClick = {() => openModal()}>
        <SendIcon/>
      </Button>
    </div>
  </div>
);

export default InfoBar;