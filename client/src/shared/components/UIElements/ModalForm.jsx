import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseRounded } from "@mui/icons-material";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import classes from "./ModalForm.module.css";

const ModalForm = (props) => {
  //INIALISATION DES DONNEES
  const initialValues = {
    nameUpdate: props.school.nameUpdate,
    addressUpdate: props.school.addressUpdate,
    originalName: props.school.originalName,
    slogan: props.school.slogan,
    continentUpdate: props.school.continentUpdate,
    countryUpdate: props.school.countryUpdate,
    cityUpdate: props.school.cityUpdate,
    description: props.school.description,
    videoPath: props.school.videoPath,
    foundationDate: props.school.foundationDate,
    levelUpdate: props.school.levelUpdate,
    sectorUpdate: props.school.sectorUpdate,
    numberOfStudents: props.school.numberOfStudents,
    phone: props.school.phone,
    email: props.school.email,
    webSiteUrl: props.school.webSiteUrl,
    picture1: props.school.imgPath1,
    picture2: props.school.imgPath2,
    picture3: props.school.imgPath3,
    picture4: props.school.imgPath4,
    picture5: props.school.imgPath5,
  };

  //FONCTION QUI MET A JOUR LES DONNEES
  const Update = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      if (value.startsWith("picture")) {
        formData.append(value, values[value]);
        const index = value.slice(-1);
        const fieldName = `imgPath${index}`;
        formData.append(fieldName, values[fieldName]);
      } else {
        formData.append(value, values[value]);
      }
    }

    const updateSchoolResponse = await fetch(
      `http://localhost:5000/api/v1/schools/${props.id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const updateSchool = await updateSchoolResponse.json();
    props.modal();
    props.getSchool();

    
    console.log(updateSchool);
  };

  //FONCTION APPEL LA FONCTION DE MISE A JOUR
  const handleFormSubmit = async (values, onSubmitProps) => {
    await Update(values, onSubmitProps);
   
  };

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
            <div
              className={classes.modal_header_close_btn}
              onClick={props.onClick}
            >
              <CloseRounded sx={{ fontSize: "30px", color: "#333" }} />
            </div>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form
                className={classes.form_modify_school}
                onSubmit={handleSubmit}
              >
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
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nameUpdate}
                      placeholder="School Name"
                      name="nameUpdate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="addressUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.addressUpdate}
                      placeholder="Address"
                      name="addressUpdate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="continentUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.continentUpdate}
                      placeholder="Continent"
                      name="continentUpdate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="countryUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.countryUpdate}
                      placeholder="Country"
                      name="countryUpdate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="foundationDate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.foundationDate}
                      placeholder="Foundation Date"
                      name="foundationDate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="numberOfStudents"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.numberOfStudents}
                      placeholder="Number Of Students"
                      name="numberOfStudents"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="levelUpdate"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.levelUpdate}
                      placeholder="Level ex: Preschol, College, University..."
                      name="levelUpdate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="sectorUpdate"
                      element="select"
                      options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                      ]}
                      value={values.sectorUpdate}
                      onChange={handleChange}
                      type="text"
                      name="sectorUpdate"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="phone"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      placeholder="Phone"
                      name="phone"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="email"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  <div className={classes.container_input}>
                    <Input
                      id="webSiteUrl"
                      element="input"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.webSiteUrl}
                      placeholder="Web Site ex : www.mysite.com"
                      name="webSiteUrl"
                    />
                  </div>
                  <Input
                    id="description"
                    element="textarea"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    type="text"
                    placeholder="Add a description (max: 250)"
                    name="description"
                  />
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
            )}
          </Formik>
        </div>
      </section>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_form"));
};

export default ModalForm;
