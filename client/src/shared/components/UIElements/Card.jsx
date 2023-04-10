import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${props.default && classes.card__container_default} ${
        props.big && classes.card__container_big
      }`}
    >
      <div className={classes.cardSugest__container_img}>
        <img src={props.img} alt={props.name} />
      </div>
      <div className={classes.cardSugest__container_text}>
        <h1>{props.name}</h1>
        <div>
          <h4 className={classes.cardSugest__text_location}>
            {props.continent} / {props.country}
          </h4>
          <h4 className={classes.cardSugest__text_location}>
            {props.area} / {props.city}
          </h4>
          <h4 className={classes.cardSugest__text_address}>{props.adress}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
