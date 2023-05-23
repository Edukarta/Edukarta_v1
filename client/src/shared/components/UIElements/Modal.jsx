import ReactDOM from "react-dom";
import React from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../FormElements/Button";
import classes from "./Modal.module.css";

function Modal(props) {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-zoom"
      mountOnEnter
      unmountOnExit
    >
      <section className={classes.container_modal}>
        <div className={classes.modal}>
          <h6>{props.text}</h6>
          <div className={classes.container_btn_modal}>
            <Button small onClick={props.remove}>Yes</Button>
            <Button small danger onClick={props.hideModal}>
              No
            </Button>
          </div>
        </div>
      </section>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_click"));
}

export default Modal;
