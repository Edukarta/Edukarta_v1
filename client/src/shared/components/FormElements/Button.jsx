import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`${classes.button} ${props.size || classes.default} ${
          props.inverse && classes.buttonInverse
        } ${props.danger && classes.buttonDanger} ${
          props.green && classes.buttonGreen
        } ${props.big && classes.buttonBig} ${
          props.small && classes.buttonSmall
        } ${props.dark && classes.buttonDark} ${props.gradient && classes.button_gradient}`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${classes.button} ${props.size || classes.default} ${
          props.inverse && classes.buttonInverse
        } ${props.danger && classes.buttonDanger} ${
          props.big && classes.buttonBig
        } ${props.gradient && classes.button_gradient}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} ${props.size || classes.default} ${
        props.inverse && classes.buttonInverse
      } ${props.danger && classes.buttonDanger} ${
        props.green && classes.buttonGreen
      } ${props.big && classes.buttonBig} ${
        props.small && classes.buttonSmall
      } ${props.dark && classes.buttonDark} ${props.gradient && classes.button_gradient}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
