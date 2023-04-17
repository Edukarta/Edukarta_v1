import React from "react";
import { LocationOn, School, Public } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/FormElements/Button";
import schoolIcon from "../../../img/school.png";
import classes from "./SchoolsInfos.module.css";

const SchoolsInfos = ({ school }) => {
  return (
    <div className={classes.container_details}>
      <h1 className={classes.school_name}>{school?.name}</h1>
      <div className={classes.container_info}>
        <div className={classes.container_icon}>
          <Public sx={{ color: "white", fontSize: "18px" }} />
        </div>
        <h4 className={classes.school_info}>{school?.continent}</h4>
      </div>
      <div className={classes.container_info}>
        <div className={classes.container_icon}>
          <LocationOn sx={{ color: "white", fontSize: "18px" }} />
        </div>
        <h4 className={classes.school_info}>{school?.address}</h4>
      </div>
      <div className={classes.container_info}>
        <div className={classes.container_icon}>
          <School sx={{ color: "white", fontSize: "18px" }} />
        </div>
        <h6 className={classes.school_info}>Grade : {school?.level} /</h6>
        <h6 className={classes.school_info}>Secteur : {school?.sector}</h6>
      </div>
      <div className={classes.container_img}>
        <img src={schoolIcon} alt="school" />
      </div>
      <div className={classes.container_link}>
        <Link to="/">Cette fiche vous apartient ?</Link>
      </div>
    </div>
  );
};

export default SchoolsInfos;
