import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseRounded } from "@mui/icons-material";
import classes from "./ModalKartaJob.module.css";

function ModalKartaJob(props) {
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
          <div
            className={classes.modal_header_close_btn}
            onClick={props.onClick}
          >
            <CloseRounded sx={{ fontSize: "30px", color: "#333" }} />
          </div>
          {props.children}
          <div className={classes.container_btn_modal}></div>
        </div>
      </section>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal_karta_job")
  );
}

export default ModalKartaJob;
