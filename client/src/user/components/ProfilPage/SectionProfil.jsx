import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AccountBalanceWallet,
  MenuBook,
  Settings,
  Logout,
  CameraAlt,
  House,
  Language,
  Email,
  Send,
  PostAdd,
} from "@mui/icons-material/";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Avatar from "../../../shared/components/UIElements/Avatar";
import { updateUser } from "../../../shared/state/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { setLogout } from "../../../shared/state/store";
import LoadingDots from "../../../shared/components/UIElements/LoadingDots";
import CardFav from "./CardFav";
import CardFriends from "./CardFriends";
import classes from "./SectionProfil.module.css";
import ModalUserUpload from "../../../shared/components/UIElements/ModalUserUpload";

const SectionProfil = (props) => {
  const id = useSelector((state) => state.user._id);
  const [openModalUpload, setOpenMoadlUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");

  const initialValuePatch = {
    banner: "",
    image: "",
    resume: "",
    letter1: "",
    letter2: "",
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
      formData.append("resume", values.resume);
      formData.append("resumePath", values.resume.name);
      formData.append("letter1", values.letter1);
      formData.append("letter1Path", values.letter1.name);
      formData.append("letter2", values.letter2);
      formData.append("letter2Path", values.letter2.name);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/user/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

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
                <div className={classes.user_infos_item}>
                  <h1 className={classes.infos_name}>{props.nameDestop}</h1>
                  <div className={classes.container_profil_menu}>
                    <Link to={`/profil/${props.id}/details`}>
                      <div className={classes.profil_menu_item}>
                        <Settings sx={{ color: "#365475", fontSize: "25px" }} />
                        <span className={classes.profil_menu_item_text}>
                          Parameters
                        </span>
                      </div>
                    </Link>

                    <div className={classes.profil_menu_item}>
                      <MenuBook sx={{ color: "#365475", fontSize: "25px" }} />
                      <span className={classes.profil_menu_item_text}>
                        My Courses
                      </span>
                    </div>

                    <div className={classes.profil_menu_item}>
                      <AccountBalanceWallet
                        sx={{ color: "#365475", fontSize: "25px" }}
                      />
                      <span className={classes.profil_menu_item_text}>
                        My Wallet
                      </span>
                    </div>

                    <div
                      className={classes.profil_menu_item}
                      onClick={() => {
                        dispatch(setLogout());
                        navigate("/");
                      }}
                    >
                      <Logout sx={{ color: "crimson", fontSize: "25px" }} />
                      <span className={classes.profil_menu_item_text}>
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>

      <div className={classes.container_profil_account}>
        {/* LEFT BLOC */}
        <div className={classes.container_card_infos_left}>
          <div className={classes.card_item_infos}>
            <h4 className={classes.profil_info_title}>
              About <span className={classes.title_bold_color}>Me</span>
            </h4>

            {/* BARRE DE PROGRESSION */}
            <div className={classes.card_progress_bar_title}>
              <span>Profil completed</span>
            </div>
            <div className={classes.container_progress_bar}>
              <div className={classes.container_bar}>
                <div
                  className={`${
                    progress < 20
                      ? classes.progress_bar_red
                      : progress > 20 && progress < 80
                      ? classes.progress_bar_orange
                      : progress >= 80 && progress < 100
                      ? classes.progress_bar_green
                      : progress === 100
                      ? classes.progress_bar_complete
                      : ""
                  }`}
                  style={{
                    width: `${progress}%`,
                  }}
                >
                  {`${progress.toFixed(0)}%`}
                </div>
              </div>
            </div>
            <div className={classes.infos_divider}></div>

            <div className={classes.profil_info_items_group}>
              <div className={classes.profil_info_item}>
                <House sx={{ color: "#365475", fontSize: "30px" }} />
                <span className={classes.infos_text_light}>I live at </span>
                <span className={classes.infos_text_bold}>
                  {props.user.address}
                </span>
              </div>
              <div className={classes.profil_info_item}>
                <Language sx={{ color: "#365475", fontSize: "30px" }} />
                <span className={classes.infos_text_light}>I come from </span>
                <span className={classes.infos_text_bold}>
                  {props.user.location}
                </span>
              </div>
              <div className={classes.profil_info_item}>
                <Email sx={{ color: "#365475", fontSize: "30px" }} />
                <span className={classes.infos_text_light}>My Email </span>
                <span className={classes.infos_text_bold}>
                  {props.user.email}
                </span>
              </div>
            </div>
          </div>

          <ModalUserUpload
            show={openModalUpload}
            onClick={() => setOpenMoadlUpload(false)}
            openModal={() => setOpenMoadlUpload(false)}
          />
          <div className={classes.card_item_resume}>
            <h4 className={classes.profil_info_title}>
              Karta<span className={classes.title_bold_color}>job</span>
            </h4>
            <div className={classes.resume_group_item}>
              <div
                className={classes.resume_item}
                onClick={() => setOpenMoadlUpload(true)}
              >
                <PostAdd sx={{ fontSize: "70px", color: "#15273c" }} />
              </div>
              <div>
                <span>Upload my resume</span>
              </div>
            </div>
          </div>

          <div className={classes.card_item_infos}>
            <CardFav id={props.id} />
          </div>

          <div className={classes.card_item_infos}>
            <CardFav id={props.id} />
          </div>

          {/* <div className={classes.card_item_infos}>
            <CardFriends id={props.user.id} />
          </div> */}
        </div>

        {/* RIGHT BLOC */}
        <div className={classes.container_profil_section}>
          <div className={classes.container_input_user_post}>
            <h4 className={classes.profil_info_title}>What's New Today?</h4>
            <div className={classes.container_input}>
              <Avatar medium image={props.image} />
              <button className={classes.input_btn_school}>
                What would you like to talk about?
              </button>
            </div>
          </div>
          <div className={classes.container_user_feed_title}>
            <h4>The latest news</h4>
            <div className={classes.container_choice_feed}>
              <button>Schools</button>
              <button>People</button>
            </div>
          </div>
          <div className={classes.container_user_feed}>
            {/* IMPLEMENTER LE FETCH DES POST ECOLE ET USER */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProfil;
