import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CardFav.module.css";
import { callApi } from "../../../utils/apiUtils";

const CardFav = (props) => {
  const [favoriteSchools, setFavoriteSchools] = useState([]);
  const navigate = useNavigate();
  const getFavorite = async () => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/user/${props.id}/favorite`,"GET")
    const savedResponse = await response;
    const statusCode = savedResponse.status;
    if(statusCode === 429 || statusCode ===403){
      navigate("/captcha")
    }
    if (savedResponse) {
      setFavoriteSchools(savedResponse.data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorite();
  }, []);

  return (
    <div>
      <div className={classes.container_header_title}>
        <span className={classes.card_fav_title}>Favorite schools</span>
        <Link to={`/profil/${props.id}/favorite`}>See All</Link>
      </div>
      {favoriteSchools.length > 0 ? <div className={classes.container_grid_img}>
        {favoriteSchools.slice(0, 9).map((school, index) => {
          return (
            <Link to={`/school/${school._id}`} className={classes.container_img} key={index}>
              <img src={school.imgPath1} alt="" />
            </Link>
          );
        })}
      </div> : 
      <h6 className={classes.noFav_text}>
        No favorite schools yet.
      </h6>}
    </div>
  );
};

export default CardFav;
