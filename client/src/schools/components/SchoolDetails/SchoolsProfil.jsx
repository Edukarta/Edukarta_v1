import React, { useState, useRef } from "react";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import Tooltip from "@mui/material/Tooltip";
import { CalendarMonth, Article, FileOpen } from "@mui/icons-material";
import Calendar from "../../../shared/components/UIElements/Calendar";
import Apply from "../../../shared/components/UIElements/Apply";
import ModalKartaJob from "../../../shared/components/UIElements/ModalKartaJob";
import { useSelector } from "react-redux";
import LoadingDots from "../../../shared/components/UIElements/LoadingDots";
import { useParams } from "react-router-dom";
import {
  CameraAlt,
  LocationOn,
  Public,
  Flag,
  ArrowBack,
  ArrowForward,
  House,
  Web,
  Phone,
  School,
  Person,
  Create,
  Email,
} from "@mui/icons-material/";
import Youtube from "react-youtube";
import fav from "../../../img/star_default.png";
import { useMediaQuery } from "@mui/material";
import Button from "../../../shared/components/FormElements/Button";
import Avatar from "../../../shared/components/UIElements/Avatar";
import ModalForm from "../../../shared/components/UIElements/ModalForm";
import classes from "./SchoolsProfil.module.css";
import StudentsApplied from "../../../shared/components/UIElements/StudentsApplied";

const SchoolsProfil = ({ school, getSchool }) => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [imgHeroIsSubmitting, setImgHeroIsSubmitting] = useState(false);
  const [imgLogoIsSubmitting, setImgLogoIsSubmitting] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [openModalKartaJob, setOpenModalKartaJob] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");
  const listRef = useRef();
  const videoId = school?.videoPath.split("v=")[1];
  const sliderImages = [
    { image: school?.imgPath1 },
    { image: school?.imgPath2 },
    { image: school?.imgPath3 },
    { image: school?.imgPath4 },
    { image: school?.imgPath5 },
  ];

  //FONCTION CARROUSEL
  const handleClick = (direction) => {
    const totalSlides = school.videoPath ? 5 : 4;
    const slideWidth = listRef.current.offsetWidth + 15;
    const distance = slideWidth * slideNumber;

    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${
        -distance + slideWidth
      }px)`;
    }

    if (direction === "right" && slideNumber < totalSlides) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${
        -distance - slideWidth
      }px)`;
    }
  };

  const initialValues = {
    picture6: school.imgPath6,
    picture7: school.imgPath7,
  };

  const Update = async (values, onSubmitProps) => {
    setIsLoading(true);
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
      `https://www.edukarta.com/api/v1/schools/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const updateSchool = await updateSchoolResponse.json();
    setImgHeroIsSubmitting(false);
    setImgLogoIsSubmitting(false);
    setIsLoading(false);
    getSchool();

    console.log(updateSchool);
  };

  const handleImageDrop1 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setFieldValue("picture6", file);
    setFieldValue("imgPath6", file.name);
  };

  const handleImageDrop2 = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    setFieldValue("picture7", file);
    setFieldValue("imgPath7", file.name);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await Update(values, onSubmitProps);
  };

  return (
    <>
      <ModalForm
        show={modalIsOpen}
        text="Modify Infos"
        onClick={() => setModalIsOpen(false)}
        modal={() => setModalIsOpen(false)}
        getSchool={getSchool}
        id={id}
        school={school}
      />

      {/* HERO */}
      <div className={classes.container_item}>
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
              className={classes.form_banner_school}
              onSubmit={handleSubmit}
            >
              <div
                className={classes.container_hero_school}
                style={{
                  backgroundImage: `url(${school?.imgPath6})`,
                  backgroundSize: "cover",
                }}
              >
                {imgHeroIsSubmitting && !isLoading && (
                  <div className={classes.container_btn_banner_apply}>
                    <Button type="submit">Apply</Button>
                  </div>
                )}
                {isLoading && imgHeroIsSubmitting && (
                  <div className={classes.container_btn_banner_apply}>
                    <LoadingDots />
                  </div>
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
                      <div
                        className={classes.container_icon_add_banner}
                        onClick={() => setImgHeroIsSubmitting(true)}
                      >
                        <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className={classes.container_hero_school_avatar}>
                  {isSmallScreen ? (
                    <Avatar
                      image={school?.imgPath7}
                      big
                      type="school"
                      link={`/school/${id}`}
                    />
                  ) : (
                    <Avatar image={school?.imgPath7} normal type="school" />
                  )}
                  {imgLogoIsSubmitting && !isLoading && (
                    <div className={classes.container_btn_logo_apply}>
                      <Button type="submit" small>
                        Apply
                      </Button>
                    </div>
                  )}
                  {isLoading && imgLogoIsSubmitting && (
                    <div className={classes.container_btn_logo_apply}>
                      <LoadingDots />
                    </div>
                  )}
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
                        <div
                          className={classes.container_icon_add_avatar}
                          onClick={() => setImgLogoIsSubmitting(true)}
                        >
                          <CameraAlt
                            sx={{ color: "white", fontSize: "17px" }}
                          />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
              {/* SCHOOL INFOS */}
              <div className={classes.container_hero_school_infos}>
                <div className={classes.container_sub_header}>
                  <div className={classes.bloc_infos}>
                    <h1 className={classes.infos_name}>
                      {school?.nameUpdate ? school?.nameUpdate : school?.name}
                    </h1>
                    <div className={classes.infos_item_group}>
                      <div className={classes.infos_item}>
                        <LocationOn
                          sx={{ fontSize: "20px", color: "#365475" }}
                        />
                        <Tooltip
                          title={
                            school.addressUpdate
                              ? school.addressUpdate
                              : school.address
                          }
                          enterTouchDelay={0}
                        >
                          <span className={classes.school_sub_info}>
                            {school?.addressUpdate
                              ? school?.addressUpdate
                              : school?.address}
                          </span>
                        </Tooltip>
                      </div>
                      <div className={classes.infos_item}>
                        <Public sx={{ fontSize: "20px", color: "#365475" }} />
                        <Tooltip
                          title={
                            school.continentUpdate
                              ? school.continentUpdate
                              : school.continent
                          }
                          enterTouchDelay={0}
                        >
                          <span className={classes.school_sub_info}>
                            {school?.continentUpdate
                              ? school?.continentUpdate
                              : school?.continent}
                          </span>
                        </Tooltip>
                      </div>
                      <div className={classes.infos_item}>
                        <Flag sx={{ fontSize: "20px", color: "#365475" }} />
                        <Tooltip
                          title={
                            school.countryUpdate
                              ? school.countryUpdate
                              : school.country
                          }
                          enterTouchDelay={0}
                        >
                          <span className={classes.school_sub_info}>
                            {school?.countryUpdate
                              ? school?.countryUpdate
                              : school?.country}
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {isSmallScreen && (
                    <div className={classes.bloc_icon}>
                      <div className={classes.bloc_icon_item}>
                        <div className={classes.container_icon_fav}>
                          <img src={fav} alt="favoris" />
                        </div>
                        <span>Add</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <>
        <div className={classes.container_profil_account}>
          {/* LEFT BLOC */}
          <div className={classes.container_card_infos_left}>
            <div className={classes.card_item_infos}>
              <h4 className={classes.profil_info_title}>
                About <span className={classes.title_bold_color}>Us</span>
              </h4>
              <div className={classes.profil_info_items_group}>
                <div className={classes.profil_info_item}>
                  <Create sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>Created at </span>
                  <span className={classes.infos_text_bold}>
                    {school?.foundationDate}
                  </span>
                </div>

                <div className={classes.profil_info_item}>
                  <Person sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>
                    Number of students
                  </span>
                  <span className={classes.infos_text_bold}>
                    {school?.numberOfStudents}
                  </span>
                </div>

                <div className={classes.profil_info_item}>
                  <School sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>Level </span>
                  <span className={classes.infos_text_bold}>
                    {school?.levelUpdate}
                  </span>
                </div>

                <div className={classes.profil_info_item}>
                  <House sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>Sector </span>
                  <span className={classes.infos_text_bold}>
                    {school?.sectorUpdate}
                  </span>
                </div>

                <div className={classes.profil_info_item}>
                  <Phone sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>Phone</span>
                  <span className={classes.infos_text_bold}>
                    {school?.phone}
                  </span>
                </div>

                <div className={classes.profil_info_item}>
                  <Email sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>Email</span>
                  <span className={classes.infos_text_bold}>
                    {school?.email}
                  </span>
                </div>

                <div className={classes.profil_info_item}>
                  <Web sx={{ color: "#365475", fontSize: "30px" }} />
                  <span className={classes.infos_text_light}>Web Site</span>
                  <span className={classes.infos_text_bold}>
                    <a href={`https://${school?.webSiteUrl}`} target="_blank">
                      {school?.webSiteUrl}
                    </a>
                  </span>
                </div>
                {!isOwner ? (
                  <Button to={user ? `/prices/${id}` : "/register"}>
                    Are you the owner ?
                  </Button>
                ) : (
                  <Button onClick={() => setModalIsOpen(true)}>
                    Modify Infos
                  </Button>
                )}
              </div>
            </div>

            {!isSmallScreen && (
              <div className={classes.card_img_mobile}>
                <h4 className={classes.profil_info_title}>
                  {school?.name} images
                </h4>
                <div className={classes.container_grid_img_mobile}>
                  {sliderImages.map(
                    (image, index) =>
                      image.image && (
                        <div className={classes.container_img} key={index}>
                          <img src={image.image} alt={image.image} />
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            <div className={classes.card_item_infos}>
              <h4 className={classes.profil_info_title}>
                Descript<span className={classes.title_bold_color}>ion</span>
              </h4>
              <div className={classes.profil_info_description}>
                {school?.description ? (
                  <p className={classes.profil_infos_school_description}>
                    {school?.description}
                  </p>
                ) : (
                  <p className={classes.profil_infos_school_description}>
                    No description yet.
                  </p>
                )}
              </div>
            </div>

            {/* KARTAJOB */}
            <ModalKartaJob
              show={openModalKartaJob}
              onClick={() => setOpenModalKartaJob(false)}
            >
              {modalContent === "calendar" && (
                <Calendar school={school?.name} id={school?.id} />
              )}
              {modalContent === "apply" && (
                <Apply
                  userImage={user.imagePath}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  userId={user._id}
                  id={id}
                  closeModal={() => setOpenModalKartaJob(false)}
                />
              )}
              {modalContent === "student" && <StudentsApplied id={id} />}
            </ModalKartaJob>
            <div className={classes.card_item_infos}>
              <h4 className={classes.profil_info_title}>
                Karta<span className={classes.title_bold_color}>Job</span>
              </h4>
              <div className={classes.container_btn_kartajob}>
                <Tooltip title="Planning" enterTouchDelay={0}>
                  <div
                    className={classes.btn_kartajob}
                    onClick={() => {
                      setOpenModalKartaJob(true);
                      setModalContent("calendar");
                    }}
                  >
                    <CalendarMonth
                      sx={{ fontSize: "70px", color: "#15273c" }}
                    />
                  </div>
                </Tooltip>
                <div
                  className={classes.btn_kartajob}
                  onClick={() => {
                    setOpenModalKartaJob(true);
                    setModalContent("apply");
                  }}
                >
                  <FileOpen sx={{ fontSize: "70px", color: "#15273c" }} />
                </div>
                <div
                  className={classes.btn_kartajob}
                  onClick={() => {
                    setOpenModalKartaJob(true);
                    setModalContent("student");
                  }}
                >
                  <Person sx={{ fontSize: "70px", color: "#15273c" }} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BLOC */}
          <div className={classes.container_profil_section}>
            {isSmallScreen && (
              <div className={classes.container_carrousel_right_Bloc}>
                <>
                  <div className={classes.container_arrow_left}>
                    <ArrowBack
                      sx={{ fontSize: "30px", color: "#333" }}
                      onClick={() => handleClick("left")}
                    />
                  </div>
                  <div className={classes.container_img_group} ref={listRef}>
                    {school.videoPath && (
                      <div className={classes.container_img_item}>
                        <Youtube
                          videoId={videoId}
                          opts={{ width: "100%", height: "100%" }}
                          className={classes.video_youtube}
                        />
                      </div>
                    )}
                    {sliderImages.map((image, index) => (
                      <div className={classes.container_img_item} key={index}>
                        {image.image ? (
                          <img src={image.image} alt={`Image ${index}`} />
                        ) : (
                          <div className={classes.carousel_no_images}>
                            No img here yet.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div
                    className={classes.container_arrow_right}
                    onClick={() => handleClick("right")}
                  >
                    <ArrowForward sx={{ fontSize: "30px", color: "#333" }} />
                  </div>
                </>
              </div>
            )}
            <div className={classes.container_input_school_post}>
              <h4 className={classes.profil_info_title}>What's New Today?</h4>
              <div className={classes.container_input}>
                <Avatar medium image={school?.imgPath7} />
                <button className={classes.input_btn_school}>
                  What would you like to talk about?
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SchoolsProfil;
