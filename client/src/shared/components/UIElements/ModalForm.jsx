import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseRounded } from "@mui/icons-material";
import { Formik } from "formik";
import LoadingDots from "./LoadingDots";
import Dropzone from "react-dropzone";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import classes from "./ModalForm.module.css";

const ModalForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage1, setPreviewImage1] = useState();
  const [previewImage2, setPreviewImage2] = useState();
  const [previewImage3, setPreviewImage3] = useState();
  const [previewImage4, setPreviewImage4] = useState();
  const [previewImage5, setPreviewImage5] = useState();
  const [isLoading, setIsLoading] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

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
    setIsSubmitting(true);
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
      `https://www.edukarta.com/api/v1/schools/${props.id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const updateSchool = await updateSchoolResponse.json();
    setIsSubmitting(false);
    props.modal();
    props.getSchool();

    console.log(updateSchool);
  };

  const handleImageDrop1 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("picture1", file);
    setFieldValue("imgPath1", file.name);
    setPreviewImage1(null);
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[0] = true;
      return newState;
    });
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setPreviewImage1(imageUrl);
      setIsLoading((prevState) => {
        const newState = [...prevState];
        newState[0] = false;
        return newState;
      });
    };
  };

  const handleImageDrop2 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("picture2", file);
    setFieldValue("imgPath2", file.name);
    setPreviewImage2(null);
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[1] = true;
      return newState;
    });

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setPreviewImage2(imageUrl);
      setIsLoading((prevState) => {
        const newState = [...prevState];
        newState[1] = false;
        return newState;
      });
    };
  };
  const handleImageDrop3 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("picture3", file);
    setFieldValue("imgPath3", file.name);
    setPreviewImage3(null);
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[2] = true;
      return newState;
    });

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setPreviewImage3(imageUrl);
      setIsLoading((prevState) => {
        const newState = [...prevState];
        newState[2] = false;
        return newState;
      });
    };
  };
  const handleImageDrop4 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("picture4", file);
    setFieldValue("imgPath4", file.name);
    setPreviewImage4(null);
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[3] = true;
      return newState;
    });

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setPreviewImage4(imageUrl);
      setIsLoading((prevState) => {
        const newState = [...prevState];
        newState[3] = false;
        return newState;
      });
    };
  };
  const handleImageDrop5 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("picture5", file);
    setFieldValue("imgPath5", file.name);
    setPreviewImage5(null);
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[4] = true;
      return newState;
    });

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setPreviewImage5(imageUrl);
      setIsLoading((prevState) => {
        const newState = [...prevState];
        newState[4] = false;
        return newState;
      });
    };
  };

  const resetPreview = () => {
    setPreviewImage1(null);
    setPreviewImage2(null);
    setPreviewImage3(null);
    setPreviewImage4(null);
    setPreviewImage5(null);
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
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.videoPath}
                      type="text"
                      placeholder="Add youtube URL"
                      name="videoPath"
                    />
                  </div>
                  <div className={classes.container_panel_img}>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleImageDrop1(acceptedFiles, setFieldValue)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className={classes.input_img}>
                            {isLoading[0] ? (
                              <LoadingDots />
                            ) : !previewImage1 ? (
                              <span>Add image here</span>
                            ) : (
                              <img src={previewImage1} alt="" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleImageDrop2(acceptedFiles, setFieldValue)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className={classes.input_img}>
                            {isLoading[1] ? (
                              <LoadingDots />
                            ) : !previewImage2 ? (
                              <span>Add image here</span>
                            ) : (
                              <img src={previewImage2} alt="" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleImageDrop3(acceptedFiles, setFieldValue)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className={classes.input_img}>
                            {isLoading[2] ? (
                              <LoadingDots />
                            ) : !previewImage3 ? (
                              <span>Add image here</span>
                            ) : (
                              <img src={previewImage3} alt="" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleImageDrop4(acceptedFiles, setFieldValue)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className={classes.input_img}>
                            {isLoading[3] ? (
                              <LoadingDots />
                            ) : !previewImage4 ? (
                              <span>Add image here</span>
                            ) : (
                              <img src={previewImage4} alt="" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <Dropzone
                      acceptedFiles=".jpeg,.jpg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleImageDrop5(acceptedFiles, setFieldValue)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className={classes.input_img}>
                            {isLoading[4] ? (
                              <LoadingDots />
                            ) : !previewImage5 ? (
                              <span>Add image here</span>
                            ) : (
                              <img src={previewImage5} alt="" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>
                <div className={classes.modal_divider}></div>
                <div className={classes.container_btn_modal_school}>
                  {!isSubmitting ? (
                    <Button type="submit" onClick={resetPreview}>
                      Apply changes
                    </Button>
                  ) : (
                    <LoadingDots />
                  )}
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
