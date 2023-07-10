import React from "react";
import { PlayArrowRounded } from "@mui/icons-material/";
import { Link as ScrollLink } from "react-scroll";
import cb from "../../img/cb_logo.png";
import master from "../../img/mastercard_logo.png";
import paypal from "../../img/paypal_logo.png";
import visa from "../../img/visa_logo.png";
import Button from "../../shared/components/FormElements/Button";
import classes from "./PriceCard.module.css";

const PriceCard = (props) => {
  return (
    <div className={classes.container_card_main}>
      <div className={classes.card_header}>
        <h3 className={classes.card_title}>{props.title}</h3>
      </div>
      <div className={classes.card_body}>{props.children}</div>
      <div className={classes.container_card_price}>
        <span
          className={`${props.text_green && classes.text_green} ${
            props.text_blue && classes.text_blue
          } ${props.text_orange && classes.text_orange}`}
        >
          {props.price}
        </span>
        <div className={classes.container_logo_payement}>
          <img src={cb} alt="blue card" />
          <img src={master} alt="mastercard" />
          <img src={visa} alt="visa" />
          <img src={paypal} alt="paypal" />
        </div>
      </div>
      <div className={classes.container_btn_card}>
        <button className={classes.prices_btn} onClick={props.onClick}>Souscrire</button>
        <ScrollLink
          to={props.anchor}
          className={classes.prices_card_info_btn}
          smooth={true}
          duration={500}
          spy={true}
          offset={-100}
        >
          Informations
        </ScrollLink>
      </div>
    </div>
  );
};

export default PriceCard;
