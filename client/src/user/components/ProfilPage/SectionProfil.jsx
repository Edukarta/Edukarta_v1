import React, { useState, useEffect } from "react";
import CardProfil from "./CardProfil";
import {
  AccountBalanceWallet,
  FavoriteBorder,
  MenuBook,
  ArrowForwardIos,
  Settings,
  Logout,
  CameraAlt,
} from "@mui/icons-material/";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Avatar from "../../../shared/components/UIElements/Avatar";
import { updateUser } from "../../../shared/state/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { setLogout } from "../../../shared/state/store";
import LoadingDots from "../../../shared/components/UIElements/LoadingDots";
import classes from "./SectionProfil.module.css";

const SectionProfil = (props) => {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");

  const initialValuePatch = {
    banner: "",
    image: "",
  };

  const patchImg = async (values, onSubmitProps) => {
    setIsSubmitting(true);
    setIsEditing(false);
    try {
      const formData = new FormData();
      formData.append("bannerPath", values.banner.name);
      formData.append("banner", values.banner);
      formData.append("image", values.image);
      formData.append("imagePath", values.image.name);

      const response = await fetch(`https://www.edukarta.com/api/v1/user/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user image.");
      }

      const savedResponse = await response.json();
      if (savedResponse) {
        dispatch(
          updateUser({
            ...savedResponse.user,
            bannerPath: savedResponse.user.bannerPath,
          })
        );
      }
      onSubmitProps.resetForm();
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await patchImg(values, onSubmitProps);
  };

  const handleImageDrop = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    // setPreviewImage(URL.createObjectURL(file));
    setFieldValue("banner", file);
  };

  const handleImageDrop1 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    // setPreviewImage(URL.createObjectURL(file));
    setFieldValue("image", file);
  };

  useEffect(() => {
    calculateProgress();
  }, [props.user]);

  const calculateProgress = () => {
    const {
      firstname,
      lastname,
      address,
      phone,
      email,
      location,
      bannerPath,
      imagePath,
    } = props.user;
    const totalFields = 8;
    let filledFields = 0;
    if (firstname) filledFields++;
    if (lastname) filledFields++;
    if (email) filledFields++;
    if (location) filledFields++;
    if (bannerPath) filledFields++;
    if (address) filledFields++;
    if (phone) filledFields++;
    if (imagePath) filledFields++;
    const calculatedProgress = (filledFields / totalFields) * 100;
    setProgress(calculatedProgress);
    console.log(progress);
  };

  return (
    <section>
      <div className={classes.container_item}>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValuePatch}>
          {({ values, handleSubmit, setFieldValue, resetForm }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.form_banner_profil}
            >
              <div
                className={classes.container_hero_user}
                style={{
                  backgroundImage: `url(${props.bannerImage})`,
                  backgroundSize: "cover",
                }}
              >
                <Dropzone
                  acceptedFiles=".jpeg,.jpg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    handleImageDrop(acceptedFiles, setFieldValue)
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className={classes.container_icon_add_banner}>
                        <CameraAlt
                          sx={{ color: "white", fontSize: "17px" }}
                          onClick={() => setIsEditing(true)}
                        />
                      </div>
                    </div>
                  )}
                </Dropzone>
                {isEditing && (
                  <button type="submit" className={classes.btn_banner_validate}>
                    Valider
                  </button>
                )}
                {isSubmitting && (
                  <div className={classes.container_loading}>
                    <LoadingDots />
                  </div>
                )}
                <div className={classes.container_hero_user_avatar}>
                  {isSmallScreen ? (
                    <Avatar image={props.image} big />
                  ) : (
                    <Avatar image={props.image} normal />
                  )}
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
                        <div className={classes.container_icon_add_avatar}>
                          <CameraAlt
                            sx={{ color: "white", fontSize: "17px" }}
                            onClick={() => setIsEditing(true)}
                          />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
              <div className={classes.container_hero_user_infos}>
                <h1 className={classes.infos_name}>{props.nameDestop}</h1>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className={classes.container_item_profil}>
        <div className={classes.container_profil_account}>
          <div className={classes.container_card_progress}>
            <h6 className={classes.card_progress_bar_title}>
              Profil completed
            </h6>
            <div className={classes.container_progress_bar}>
              <div
                className={`${progress < 20 ? classes.progress_bar_red : (progress > 20 && progress < 80) ? classes.progress_bar_orange : (progress >= 80 && progress < 100) ? classes.progress_bar_green : (progress === 100) ? classes.progress_bar_complete : ''}`}
                style={{
                  width: `${progress}%`,
                }}
              >
                {`${progress.toFixed(0)}%`}
              </div>
            </div>
          </div>
          <div className={classes.container_profil_section}>
            <div
              className={classes.card_profil_item}
              onClick={() => navigate(`/profil/${props.id}/details`)}
            >
              <CardProfil
                text="Parameters"
                icon={<Settings sx={{ color: "#555555", fontSize: "30px" }} />}
                arrow={
                  !isSmallScreen && (
                    <ArrowForwardIos
                      sx={{ color: "#555555", fontSize: "18px" }}
                    />
                  )
                }
                normal
              />
            </div>
            <div className={classes.card_profil_item}>
              <CardProfil
                text="My favorites"
                icon={
                  <FavoriteBorder sx={{ color: "#555555", fontSize: "30px" }} />
                }
                arrow={
                  !isSmallScreen && (
                    <ArrowForwardIos
                      sx={{ color: "#555555", fontSize: "18px" }}
                    />
                  )
                }
                normal
              />
            </div>
            <div className={classes.card_profil_item}>
              <CardProfil
                text="My Classes"
                icon={<MenuBook sx={{ color: "#555555", fontSize: "30px" }} />}
                arrow={
                  !isSmallScreen && (
                    <ArrowForwardIos
                      sx={{ color: "#555555", fontSize: "18px" }}
                    />
                  )
                }
                normal
              />
            </div>
            <div className={classes.card_profil_item}>
              <CardProfil
                text="Wallet"
                icon={
                  <AccountBalanceWallet
                    sx={{ color: "#555555", fontSize: "30px" }}
                  />
                }
                arrow={
                  !isSmallScreen && (
                    <ArrowForwardIos
                      sx={{ color: "#555555", fontSize: "18px" }}
                    />
                  )
                }
                normal
              />
            </div>
            <div
              className={classes.card_profil_item_logout}
              onClick={() => {
                dispatch(setLogout());
                navigate("/");
              }}
            >
              <Logout sx={{ color: "white", fontSize: "30px" }} />
              <h6 className={classes.card_profil_logout_text}>Logout</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProfil;
