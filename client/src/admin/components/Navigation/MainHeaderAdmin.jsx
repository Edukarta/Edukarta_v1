import React from 'react';
import classes from "./MainHeaderAdmin.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes.container__admin_header}>
        {props.children}
    </header>
  )
}

export default MainHeader