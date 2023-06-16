import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { setLogin } from "../../shared/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Create, Done } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";
import classes from "./ProfilDetails.module.css";
import LoadingDots from "../../shared/components/UIElements/LoadingDots";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { callApi } from "../../utils/apiUtils";

const initialValuePatch = {
  image: "",
};

const ProfilDetails = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const patchImg = async (values, onSubmitProps) => {
    const formData = new FormData();
    setIsSubmitting(true);
    formData.append("imagePath", values.image.name); // Ajoute l'imagePath d'origine
    formData.append("image", values.image);
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`,"PATCH",formData)
    const savedResponse = await response.data;
    const statusCode = savedResponse.status;
    if(statusCode === 429|| statusCode ===403){
      navigate("/captcha")
    }
    onSubmitProps.resetForm();

    if (savedResponse) {
      dispatch(
        setLogin({
          user: savedResponse.user,
          token: savedResponse.token,
        })
      );
    }
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await patchImg(values, onSubmitProps);
  };

  const handleImageDrop = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setPreviewImage(URL.createObjectURL(file));
    setFieldValue("image", file);
  };

  return (
    <>
      <div className={classes.container_navigation}>
        <MainNavigation type="profil" />
      </div>
      <div className={classes.containerProfil}>
        <div className={classes.container_infos}>
          <h1 className={classes.container_title__profil}>
            Account Parameters
          </h1>
          {previewImage ? (
            <div className={classes.preview}>
              <img src={previewImage} alt="" />
            </div>
          ) : (
            <Avatar image={user.imagePath} big />
          )}
          <Formik onSubmit={handleFormSubmit} initialValues={initialValuePatch}>
            {({ values, handleSubmit, setFieldValue, resetForm }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png"
                    multiple={false}
                    name="image"
                    onDrop={(acceptedFiles) =>
                      handleImageDrop(acceptedFiles, setFieldValue)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!values.image ? (
                          <div className={classes.icon__change_pic}>
                            <Create sx={{ color: "white" }} />
                          </div>
                        ) : (
                          <div className={classes.icon__change_pic_done}>
                            <Done sx={{ color: "white", fontSize: "40px" }} />
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  {isSubmitting && <LoadingDots />}
                </div>
                <div className={classes.container_profil_details_validate_btn}>
                  {values.image && <Button type="submit">Valider</Button>}
                </div>
              </form>
            )}
          </Formik>
          <div className={classes.container_Input}>
            <div className={classes.formControl}>
              <label>Firstname</label>
              <input type="text" placeholder={user.firstname} disabled />
            </div>
            <div className={classes.formControl}>
              <label>Lastname</label>
              <input type="text" placeholder={user.lastname} disabled />
            </div>
            <div className={classes.formControl}>
              <label>Address</label>
              <input type="text" placeholder={user.address} disabled />
            </div>
            <div className={classes.formControl}>
              <label>Phone</label>
              <input type="text" placeholder={user.phone} disabled />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilDetails;
