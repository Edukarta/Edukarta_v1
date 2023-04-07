import React from 'react';
import {Navigation} from '@mui/icons-material';
import classes from "./ButtonNavBottom.module.css"

const ButtonNavBottom = (props) => {
  return (
    <button onClick={props.onClick} className={classes.btn}>
        <Navigation sx={{color: "white", fontSize:"35px", transform: 'rotate(45deg)'}}/>
    </button>
  )
}

export default ButtonNavBottom