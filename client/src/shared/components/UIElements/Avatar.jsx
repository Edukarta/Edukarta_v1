import React from "react";
import { Link } from "react-router-dom";
import classes from "./Avatar.module.css";

const Avatar = ({ userId, image, normal, big, medium, type, link }) => {
  const avatarClassName = big
    ? classes.containerAvatarBig
    : classes.containerAvatar;
  return (
    <Link to={link}>
      <div
        className={`${classes.containerAvatar} ${
          normal ? classes.containerAvatarNormal : ""
        } ${big ? classes.containerAvatarBig : ""} ${
          medium ? classes.containerAvatarMedium : ""
        }`}
      >
        {image ? (
          <img src={image} alt="" />
        ) : type === "school" ? (
          <div className={classes.container_add_logo_here}>
            <h6>Ajoutez votre logo ici.</h6>
          </div>
        ) : (
          <img
            src="https://www.pega.com/modules/shared/pega_user_image/assets/user-icon.png"
            alt="user"
          />
        )}
      </div>
    </Link>
  );
};

export default Avatar;
