import React, { useState, useRef } from "react";
import {
  CameraAlt,
  LocationOn,
  Public,
  Flag,
  LocationCity,
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
import Button from "../../../shared/components/FormElements/Button";
import Avatar from "../../../shared/components/UIElements/Avatar";
import classes from "./SchoolsProfil.module.css";

const SchoolsProfil = ({ school, getSchools }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
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
    setIsMoved(true);
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

  // const handleThumbnailClick = (index) => {
  //   setSlideNumber(index + 1);
  //   console.log(index + "clicked" )
  // };

  console.log(slideNumber);

  return (
    <>
      <section>
        {/* HERO */}
        <div className={classes.container_item}>
          <form className={classes.form_banner_school}>
            <div
              className={classes.container_hero_school}
              style={{
                backgroundImage: `url(${school?.imgPath1})`,
                backgroundSize: "cover",
              }}
            >
              <div className={classes.container_icon_add_banner}>
                <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
              </div>
              <div className={classes.container_hero_school_avatar}>
                <Avatar big />
                <div className={classes.container_icon_add_avatar}>
                  <CameraAlt sx={{ color: "white", fontSize: "17px" }} />
                </div>
              </div>
            </div>
            {/* SCHOOL INFOS */}
            <div className={classes.container_hero_school_infos}>
              <div className={classes.container_sub_header}>
                <div className={classes.bloc_infos}>
                  <h1 className={classes.infos_name}>{school?.name}</h1>
                  <div className={classes.infos_item_group}>
                    <div className={classes.infos_item}>
                      <LocationOn sx={{ fontSize: "20px", color: "#365475" }} />
                      <span className={classes.school_sub_info}>
                        {school?.address}
                      </span>
                    </div>
                    <div className={classes.infos_item}>
                      <Public sx={{ fontSize: "20px", color: "#365475" }} />
                      <span className={classes.school_sub_info}>
                        {school?.continent}
                      </span>
                    </div>
                    <div className={classes.infos_item}>
                      <Flag sx={{ fontSize: "20px", color: "#365475" }} />
                      <span className={classes.school_sub_info}>
                        {school?.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={classes.bloc_icon}>
                  <div className={classes.bloc_icon_item}>
                    <div className={classes.container_icon_fav}>
                      <img src={fav} alt="favoris" />
                    </div>
                    <span>Add</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className={classes.container_profil_account}>
          {/* LEFT BLOC */}
          <div className={classes.container_card_infos_left}>
            <div className={classes.card_item_infos}>
              <h4 className={classes.profil_info_title}>About Us</h4>
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
                    {school?.webSiteUrl}
                  </span>
                </div>
                <Button to={"/prices"}>Are you the owner ?</Button>
              </div>
            </div>

            <div className={classes.card_item_infos}>
              <h4 className={classes.profil_info_title}>Description</h4>
              <p className={classes.profil_info_description}>
                {school?.description ? (
                  <p className={classes.profil_infos_school_description}>
                    {school?.description}
                  </p>
                ) : (
                  <p className={classes.profil_infos_school_description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur ullam aliquam atque voluptas tenetur modi cumque
                    accusamus sapiente alias odio. Sed minus rerum, placeat
                    doloribus impedit eveniet aut nobis natus.
                  </p>
                )}
              </p>
              <Button to={"/prices"} big>
                Apply
              </Button>
            </div>
          </div>

          {/* RIGHT BLOC */}
          <div className={classes.container_profil_section}>
            <div className={classes.container_carrousel_right_Bloc}>
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
                      <img
                        src="https://cdn-prod.voxy.com/wp-content/uploads/2012/10/school-1.jpg"
                        alt="default image"
                      />
                    )}
                  </div>
                ))}
              </div>
              {/* <div className={classes.container_thumbnail}>
                {sliderImages.map((image, index) => (
                  <div
                    className={classes.container_img_item_thumbnail}
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    {image.image ? (
                      <img src={image.image} alt={`Image ${index}`} />
                    ) : (
                      <img
                        src="https://cdn-prod.voxy.com/wp-content/uploads/2012/10/school-1.jpg"
                        alt="default image"
                      />
                    )}
                  </div>
                ))}
              </div> */}
              <div
                className={classes.container_arrow_right}
                onClick={() => handleClick("right")}
              >
                <ArrowForward sx={{ fontSize: "30px", color: "#333" }} />
              </div>
            </div>
            <div className={classes.container_input_school_post}>
              <h4 className={classes.profil_info_title}>What's New Today?</h4>
              <div className={classes.container_input}>
                <Avatar medium />
                <button className={classes.input_btn_school}>
                  What would you like to talk about?
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SchoolsProfil;
