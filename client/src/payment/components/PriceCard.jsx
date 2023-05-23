import React from "react";
import { PlayArrowRounded } from "@mui/icons-material/";
import Button from "../../shared/components/FormElements/Button";
import classes from "./PriceCard.module.css";

const PriceCard = (props) => {
  return (
    <div className={classes.container_card_main}>
      <div
        className={`${classes.card_header} ${
          props.green && classes.headerGreen
        } ${props.blue && classes.headerBlue} ${
          props.orange && classes.headerOrange
        }`}
      >
        <h3 className={classes.card_title}>{props.title}</h3>
        <div className={classes.card_header_icon}>
          <PlayArrowRounded sx={{ fontSize: "35px", color: props.color }} />
        </div>
      </div>
      <div className={classes.card_body}>
        <div className={classes.divider}></div>
        {props.children}
        <div className={classes.divider}></div>
      </div>
      <div className={classes.container_card_price}>
        <h4
          className={`${props.text_green && classes.text_green} ${
            props.text_blue && classes.text_blue
          } ${props.text_orange && classes.text_orange}`}
        >
          {props.price}
        </h4>
      </div>
      <div className={classes.container_btn_card}>
          <Button>Subscribe</Button>
          <Button href={props.href}>More Informations</Button>
      </div>
    </div>
  );
};

export default PriceCard;
