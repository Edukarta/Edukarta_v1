import React from "react";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <div
      className={`${
        props.type === "profil" ? classes.mainheaderProfile : classes.mainheader
      }`}
    >
      {props.children}
    </div>
  );
};

export default MainHeader;
