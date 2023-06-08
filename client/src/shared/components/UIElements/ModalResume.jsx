import ReactDOM from "react-dom";
import React from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../FormElements/Button";
import { CloseRounded } from "@mui/icons-material";
import classes from "./ModalResume.module.css";

function ModalResume(props) {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-zoom"
      mountOnEnter
      unmountOnExit
    >
      <div className={classes.container_modal}>
        <div className={classes.modal}>
          <div
            className={classes.modal_header_close_btn}
            onClick={props.onClick}
          >
            <CloseRounded sx={{ fontSize: "30px", color: "#333" }} />
          </div>
          {props.children}
          <div className={classes.container_btn_modal}></div>
        </div>
      </div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal_resume")
  );
}

export default ModalResume;
