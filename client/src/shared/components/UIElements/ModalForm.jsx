import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseRounded } from "@mui/icons-material";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import classes from "./ModalForm.module.css";

const ModalForm = (props) => {
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
          <div className={classes.modal_header}>
            <div className={classes.container_title_modal}>
              <h6>{props.text}</h6>
            </div>
            <div className={classes.modal_header_close_btn} onClick={props.onClick}>
              <CloseRounded sx={{ fontSize: "30px", color: "#333" }} />
            </div>
          </div>

          <form className={classes.form_modify_school}>
            <div className={classes.container_title_modal}>
              <div className={classes.divider_title}></div>
              <h6>Basic informations</h6>
            </div>
            <div className={classes.modal_body}>
              <div className={classes.container_input}>
                <Input
                  id="nameUpdate"
                  element="input"
                  type="text"
                  placeholder="School Name"
                  name="nameUpdate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="addressUpdate"
                  element="input"
                  type="text"
                  placeholder="Address"
                  name="addressUpdate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="continentUpdate"
                  element="input"
                  type="text"
                  placeholder="Continent"
                  name="continentUpdate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="countryUpdate"
                  element="input"
                  type="text"
                  placeholder="Country"
                  name="countryUpdate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="fondationDate"
                  element="input"
                  type="text"
                  placeholder="Foundation Date"
                  name="fondationDate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="numberOfDtudents"
                  element="input"
                  type="text"
                  placeholder="Number Of Students"
                  name="numberOfDtudents"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="levelUpdate"
                  element="input"
                  type="text"
                  placeholder="Level ex: Preschol, College, University..."
                  name="LevelUpdate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="sector"
                  element="select"
                  options={[
                    { value: "public", label: "Public" },
                    { value: "private", label: "Private" },
                  ]}
                  type="text"
                  name="sectorUpdate"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="phone"
                  element="input"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="email"
                  element="input"
                  type="text"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div className={classes.container_input}>
                <Input
                  id="webSiteUrl"
                  element="input"
                  type="text"
                  placeholder="Web Site ex : www.mysite.com"
                  name="email"
                />
              </div>
            </div>
            <div className={classes.modal_divider}></div>
            <div className={classes.modal_footer}>
              <div className={classes.container_title_modal}>
                <div className={classes.divider_title}></div>
                <h6>Add video and images</h6>
              </div>
              <div className={classes.container_input_video}>
                <Input
                  id="videoPath"
                  element="input"
                  type="text"
                  placeholder="Add youtube URL"
                  name="email"
                />
              </div>
              <div className={classes.container_panel_img}>
                <div className={classes.input_img}>
                  <span>Add image here</span>
                </div>
                <div className={classes.input_img}>
                  <span>Add image here</span>
                </div>
                <div className={classes.input_img}>
                  <span>Add image here</span>
                </div>
                <div className={classes.input_img}>
                  <span>Add image here</span>
                </div>
                <div className={classes.input_img}>
                  <span>Add image here</span>
                </div>
              </div>
            </div>
            <div className={classes.modal_divider}></div>
            <div className={classes.container_btn_modal_school}>
              <Button type="submit">Apply changes</Button>
            </div>
          </form>
        </div>
      </section>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_form"));
};

export default ModalForm;
