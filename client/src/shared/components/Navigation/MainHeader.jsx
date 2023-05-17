import React from "react";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header
      className={`${
        props.type === "profil" ? classes.mainheaderProfile : classes.mainheader
      }`}
    >
      {props.children}
    </header>
  );
};

export default MainHeader;
