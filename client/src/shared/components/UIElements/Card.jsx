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
      <div
        className={`${props.default && classes.cardSugest__container_img} ${
          props.big && classes.cardSugest__container_img_big
        }`}
      >
        {props.img ? (
          <img src={props.img} alt={props.name} />
        ) : (
          <img src={schoolIcon} />
        )}
      </div>
      <div
        className={`${props.default && classes.cardSugest__container_text} ${
          props.big && classes.cardSugest__container_text_big
        } `}
      >
        <h1 className={classes.cardName}>{props.name}</h1>
        <div className={classes.container_infos__school}>
          <span className={classes.cardSugest__text_location}>
            {props.continent} / {props.country}
          </span>
          {props.city ||
            (props.area && props.areaUpdate && (
              <span className={classes.cardSugest__text_location}>
                {props.area} / {props.city}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
