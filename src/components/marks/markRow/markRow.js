import React from "react";
import classes from './markRow.module.css'

const markRow = (props) => {
    return (
        <div className={classes.MarkRow}> 
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.remove} disabled={props.disabled}>LESS</button>
            <button className={classes.More} onClick={props.added}>MORE</button>
        </div>
    );
};

export default markRow;