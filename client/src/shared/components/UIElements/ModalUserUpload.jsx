import React, { useState } from "react";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import ReactDOM from "react-dom";
import { Done } from "@mui/icons-material";
import { updateUser } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { CloseRounded, Article, Person } from "@mui/icons-material";
import Button from "../FormElements/Button";
import classes from "./ModalUserUpload.module.css";

function ModalUserUpload(props) {
  const { id } = useParams();
  const [previewImage1, setPreviewImage1] = useState();
  const [previewImage2, setPreviewImage2] = useState();
  const [previewImage3, setPreviewImage3] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialValuePatch = {
    resume: "",
    letter1: "",
    letter2: "",
  };

  const patchImg = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      formData.append("resume", values.resume);
      formData.append("resumePath", values.resume.name);
      formData.append("letter1", values.letter1);
      formData.append("letter1Path", values.letter1.name);
      formData.append("letter2", values.letter2);
      formData.append("letter2Path", values.letter2.name);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/${user._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user image.");
      }

      const savedResponse = await response.json();

      if (savedResponse && savedResponse.user) {
        dispatch(
          updateUser({
            ...savedResponse.user,
            resumePath: savedResponse.user.resumePath,
            letter1Path: savedResponse.user.letter1Path,
            letter2Path: savedResponse.user.letter2Path,
          })
        );
      }
      onSubmitProps.resetForm();
      props.openModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await patchImg(values, onSubmitProps);
  };

  const handleImageDrop1 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setPreviewImage1(URL.createObjectURL(file));
    setFieldValue("resume", file);
   
  };

  const handleImageDrop2 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setPreviewImage2(URL.createObjectURL(file));
    setFieldValue("letter1", file);
  };

  const handleImageDrop3 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setPreviewImage3(URL.createObjectURL(file));
    setFieldValue("letter2", file);
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
          <div
            className={classes.modal_header_close_btn}
            onClick={props.onClick}
          >
            <CloseRounded sx={{ fontSize: "30px", color: "#333" }} />
          </div>
          <h3 className={classes.modal_upload_title}>Upload your data</h3>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValuePatch}>
            {({ values, handleSubmit, setFieldValue, resetForm }) => (
              <form
                onSubmit={handleSubmit}
                className={classes.container_form_upload}
              >
                <div className={classes.modal_body}>
                  <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      handleImageDrop1(acceptedFiles, setFieldValue)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!previewImage1 ? (
                          <div className={classes.dropzone}>
                            <Article
                              sx={{ fontSize: "70px", color: "#15273c" }}
                            />
                          </div>
                        ) : (
                          <div className={classes.dropzone}>
                            <h5>File Upoladed Sucessfully</h5>
                            <Done sx={{color: "green", fontSize: "35px"}} />
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>

                  <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      handleImageDrop2(acceptedFiles, setFieldValue)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!previewImage2 ? (
                          <div className={classes.dropzone}>
                            <Article
                              sx={{ fontSize: "70px", color: "#15273c" }}
                            />
                          </div>
                        ) : (
                          <div className={classes.dropzone}>
                            <h5>File Upoladed Sucessfully</h5>
                            <Done sx={{color: "green", fontSize: "35px"}} />
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>

                  <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      handleImageDrop3(acceptedFiles, setFieldValue)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!previewImage3 ? (
                          <div className={classes.dropzone}>
                            <Article
                              sx={{ fontSize: "70px", color: "#15273c" }}
                            />
                          </div>
                        ) : (
                          <div className={classes.dropzone}>
                            <h5>File Upoladed Sucessfully</h5>
                            <Done sx={{color: "green", fontSize: "35px"}} />
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className={classes.container_btn_modal_upload}>
                  <Button big type="submit">
                    Send
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal_karta_job")
  );
}

export default ModalUserUpload;
