import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        // value={inputState.value}
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <div
      className={`${classes.formControl}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default Input;
