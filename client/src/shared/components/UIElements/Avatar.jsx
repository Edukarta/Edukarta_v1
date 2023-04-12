import React from "react";
import { Link } from "react-router-dom";
import classes from "./Avatar.module.css";

const Avatar = ({ userId, image}) => {
  return (
    <Link to={`/profil/${userId}`}>
      <div className={classes.containerAvatar}>
        {image ? (
          <img
            src={`http://localhost:5000/public/assets/${image}`}
            alt="profile"
          />
        ) : (
          <img
            src="https://www.pega.com/modules/shared/pega_user_image/assets/user-icon.png"
            alt="profile"
          />
        )}
      </div>
    </Link>
  );
};

export default Avatar;
