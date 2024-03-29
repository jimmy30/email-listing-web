
import React from "react";
import classes from "./Popup.module.css";
 
const Popup = props => {
  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <span className={classes.closeIcon} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;