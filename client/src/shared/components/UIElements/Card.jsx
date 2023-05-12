import React from "react";
import schoolIcon from "../../../img/img_school.jpg";
import classes from "./Card.module.css";

const Card = (props) => {
  const fontSize = props.default ? "15px" : "25px";
  return (
    <div className={classes.card__container}>
      <div className={classes.cardSugest__container_img}>
        {props.img ? (
          <img src={props.img} alt={props.name} />
        ) : (
          <img src={schoolIcon} />
        )}
      </div>
      <div className={classes.cardSugest__container_text}>
        <h5 className={classes.cardName}>{props.name}</h5>
        <h5 className={classes.cardCountry}>{props.country}</h5>
      </div>
    </div>
  );
};

export default Card;
