import React, { useState, useEffect } from "react";
import schoolIcon from "../../../img/img_school.jpg";
import { Link } from "react-router-dom";
import classes from "./CardFav.module.css";

const CardFav = (props) => {
  const [favoriteSchools, setFavoriteSchools] = useState([]);
  const getFavorite = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/user/${props.id}/favorite`,
      {
        method: "GET",
      }
    );
    const savedResponse = await response.json();
    if (savedResponse) {
      setFavoriteSchools(savedResponse);
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
          Favorite <span className={classes.title_bold_color}>schools</span>
        </span>
        <Link to={`/profil/${props.id}/favorite`}>See All</Link>
      </div>
      {favoriteSchools.length > 0 ? (
        <div className={classes.container_grid_img}>
          {favoriteSchools.slice(0, 9).map((school, index) => {
            return (
              <Link
                to={`/school/${school._id}`}
                className={classes.container_img}
                key={index}
              >
                {school.imgPath1 ? (
                  <img src={school.imgPath1} alt={school.name} />
                ) : (
                  <img src={schoolIcon}alt={school.name} />
                )}
              </Link>
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
