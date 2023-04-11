import React from "react";
import classes from "./CardProfil.module.css";

const CardProfil = (props) => {
  return (
    <div className={classes.card_container}>
      <div className={classes.container_global}>
        <div className={classes.container_text_icon}>
          <div className={classes.container_icon}>{props.icon}</div>
          <div className={classes.container_text}>
            <h3>{props.text}</h3>
            <h5>{props.sub}</h5>
          </div>
        </div>
        <div className={classes.container_arrow}>{props.arrow}</div>
      </div>
    </div>
  );
};

export default CardProfil;
