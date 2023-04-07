import React from "react";
import classes from "./CardSugest.module.css";

const CardSugest = (props) => {
  return (
    <div className={classes.cardSugest__container}>
      <div className={classes.cardSugest__container_img}>
        <img src={props.img} alt={props.name} />
      </div>
      <div className={classes.cardSugest__container_text}>
        <h1>{props.name}</h1>
        <div>
          <h4 className={classes.cardSugest__text_location}>{props.continent}/{props.country}</h4>
          <h4 className={classes.cardSugest__text_location}>{props.area}</h4>
          <h4 className={classes.cardSugest__text_location}>{props.city}</h4>
          <h4 className={classes.cardSugest__text_address}>{props.adress}</h4>
        </div>
      </div>
    </div>
  );
};

export default CardSugest;
