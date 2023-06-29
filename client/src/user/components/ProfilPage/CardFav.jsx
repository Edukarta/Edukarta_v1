import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import schoolIcon from "../../../img/img_school.jpg";
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
        <span className={classes.card_fav_title}>
          Mes <span className={classes.title_bold_color}>Favoris</span>
        </span>
        <Link to={`/profil/${props.id}/favorite`}>Voir Tout</Link>
      </div>
      {favoriteSchools.length > 0 ? (
        <div className={classes.container_grid_img}>
          {favoriteSchools.slice(0, 9).map((school, index) => {
            return (
              <Tooltip
                title={
                  school.nameUpadte ? school.nameUpdate : school.name
                }
                enterTouchDelay={0}
                key={index}
              >
                <Link
                  to={`/school/${school._id}`}
                  className={classes.container_img}
                 
                >
                  {school.imgPath1 ? (
                    <img src={school.imgPath1} alt={school.name} />
                  ) : (
                    <img src={schoolIcon} alt={school.name} />
                  )}
                </Link>
              </Tooltip>
            );
          })}
        </div>
      ) : (
        <h6 className={classes.noFav_text}>No favorite schools yet.</h6>
      )}
    </div>
  );
};

export default CardFav;
