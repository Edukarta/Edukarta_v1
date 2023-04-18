import React from "react";
import schoolIcon from "../../../img/school.png";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${props.default && classes.card__container_default} ${
        props.big && classes.card__container_big
      }`}
    >
      <div className={classes.cardSugest__container_img}>
        {props.img ? (
          <img src={props.img} alt={props.name} />
        ) : (
          <img src={schoolIcon} />
        )}
      </div>
      <div className={classes.cardSugest__container_text}>
        <h1 className={classes.cardName}>{props.name}</h1>
        <div>
          <h4 className={classes.cardSugest__text_location}>
            {props.continent} / {props.country}
          </h4>
          {props.city ||
            (props.area && (
              <h4 className={classes.cardSugest__text_location}>
                {props.area} / {props.city}
              </h4>
            ))}
          <h4 className={classes.cardSugest__text_address}>{props.adress}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
