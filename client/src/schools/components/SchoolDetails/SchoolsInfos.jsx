import React from "react";
import { LocationOn, School, Public } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/FormElements/Button";
import schoolIcon from "../../../img/school.png";
import classes from "./SchoolsInfos.module.css";

const SchoolsInfos = ({ school }) => {
  return (
    <div className={classes.container_details}>
      <h1 className={classes.school_name}>
        {school?.nameUpdate ? school?.nameUpdate : school?.name}
      </h1>
      {!school?.imgPath ? (
        <div className={classes.container_img}>
          <img src={schoolIcon} alt="school" />
        </div>
      ) : (
        <div className={classes.container_img}>
          <img
            src={`http://localhost:5000/images/${school?.imgPath}`}
            alt="profile"
          />
        </div>
      )}
      <div className={classes.container_info}>
        <div className={classes.container_icon}>
          <Public sx={{ color: "white", fontSize: "18px" }} />
        </div>
        <h4 className={classes.school_info}>
          {school?.continentUpdate ? school?.continentUpdate : school?.continent}
        </h4>
      </div>
      <div className={classes.container_info}>
        <div className={classes.container_icon}>
          <LocationOn sx={{ color: "white", fontSize: "18px" }} />
        </div>
        <h4 className={classes.school_info}>{school?.addressUpdate ? school?.addressUpdate : school?.address}</h4>
      </div>
      <div className={classes.container_info}>
        <div className={classes.container_icon}>
          <School sx={{ color: "white", fontSize: "18px" }} />
        </div>
        <h6 className={classes.school_info}>Grade : {school?.levelUpdate ? school?.levelUpdate : school?.level} /</h6>
        <h6 className={classes.school_info}>Secteur : {school?.sectorUpdate ? school?.sectorUpdate : school?.sector}</h6>
      </div>
      {school?.description && <div className={classes.container_desc}>
        <h5>A propos de nous</h5>
        <p>{school?.description}</p>
      </div>}

      <div className={classes.container_link}>
        <Link to={`/school/${school?.id}/request`}>
          Cette fiche vous apartient ?
        </Link>
      </div>
    </div>
  );
};

export default SchoolsInfos;
