import React from "react";
import schoolIcon from "../../../img/school.png";
import { FavoriteBorder } from "@mui/icons-material/";
import classes from "./Card.module.css";

const Card = (props) => {
  const fontSize = props.default ? "15px" : "25px";
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
        <h1
          className={`${props.default && classes.cardName} ${
            props.big && classes.cardNameBig
          }`}
        >
          {props.name}
        </h1>
        {/* <div className={classes.container_infos__school}>
          <span className={classes.cardText__country}>
            {props.continent} / {props.country}
          </span>
          <span className={classes.cardText__city}>
            {props.area ? `${props.area} / ${props.city}` : props.city}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
