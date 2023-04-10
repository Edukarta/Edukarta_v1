import React from "react";
import { Link } from "react-router-dom";
import classes from "./Avatar.module.css";

const Avatar = ({userId}) => {
  return (
    <Link to={`/profil/${userId}`}>
      <div className={classes.containerAvatar}>
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="profile"
        />
      </div>
    </Link>
  );
};

export default Avatar;
