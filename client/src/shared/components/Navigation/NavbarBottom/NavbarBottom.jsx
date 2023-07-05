import React, { useState, useEffect } from "react";
import {
  House,
  Favorite,
  OndemandVideo,
  ImportContacts,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonNavBottom from "./ButtonNavBottom";
import { callApi } from "../../../../utils/apiUtils";
import classes from "./NavbarBottom.module.css";
import MapDrawer from "../../UIElements/MapDrawer";
import { useSelector } from "react-redux";
import Map from "../../UIElements/Map";

const NavbarBottom = ({schools}) => {
  const navigate = useNavigate();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [popularSchools, setPopularSchools] = useState([]);

  //FETCH DES DONNEES A MODIFIER !!!!!!!
  const fetchPopularSchools = async () => {
    try {
      const responseData = await callApi(`${process.env.REACT_APP_API_URL}/api/v1/schools/popular`, "GET");
      const statusCode =  await responseData.status;
      if(statusCode === 429 || statusCode ===403){
        navigate("/captcha")
      }
      const allSchools = await responseData.data;
      setPopularSchools((prevSchools) => {
        const updatedSchools = [...prevSchools];

        if (allSchools && allSchools.schools) {
          allSchools.schools.forEach((newSchool) => {
            if (
              !prevSchools.some((prevSchool) => prevSchool.id === newSchool.id)
            ) {
              updatedSchools.push(newSchool);
            }
          });
        }

        return updatedSchools;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularSchools();
  }, []);

  return (
    <>
      <div className={classes.navbarBottom__container}>
        <MapDrawer show={drawerIsOpen}>
          <Map schools={popularSchools} />
        </MapDrawer>
        {/* <div className={classes.navbarBottom__container_icon}>
          <Link to="/">
            <House sx={{ fontSize: "40px" }} />
          </Link>
          <Link to="/">
            <Favorite sx={{ fontSize: "40px" }} />
          </Link>
        </div> */}
        <ButtonNavBottom onClick={() => setDrawerIsOpen((prev) => !prev)} />
        {/* <div className={classes.navbarBottom__container_icon}>
          <Link to="/">
            <ImportContacts sx={{ fontSize: "40px" }} />
          </Link>
          <Link to="/">
            <OndemandVideo sx={{ fontSize: "40px" }} />
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default NavbarBottom;
