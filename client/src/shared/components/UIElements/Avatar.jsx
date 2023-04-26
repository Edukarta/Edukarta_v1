import React from "react";
import { Link } from "react-router-dom";
import classes from "./Avatar.module.css";

const Avatar = ({ userId, image, normal, big }) => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const avatarClassName = big
    ? classes.containerAvatarBig
    : classes.containerAvatar;
  return (
    <Link to={`/profil/${userId}`}>
      <div
        className={`${classes.containerAvatar} ${
          normal ? classes.containerAvatarNormal : ""
        } ${big ? classes.containerAvatarBig : ""}`}
      >
        {image ? (
          <img src={`${URL}/images/${image}`} alt="profile" />
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
