import React from "react";
import schoolIcon from "../../../img/img_school.jpg";
import starDefault from "../../../img/star_default.png"
import starFav from "../../../img/star_fav.png"
import { Link } from "react-router-dom";
import { StarTwoTone } from "@mui/icons-material/";
import classes from "./Card.module.css";

const Card = (props) => {
  const fontSize = props.default ? "15px" : "25px";

  return (
    <div className={classes.card__container}>
      <div className={classes.icon_fav} onClick={props.onClick}>
        {!props.iconColor ? <img src={starDefault} alt="" /> : <img src={starFav} alt=""/> }
      </div>
      <Link to={props.link}>
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
      </Link>
    </div>
  );
};

export default Card;
