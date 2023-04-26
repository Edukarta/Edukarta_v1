import React, { useState, useEffect } from "react";
import { LocationOn, Public, Flag, LocationCity } from "@mui/icons-material/";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import schoolIcon from "../../../img/school.png";
import classes from "./SchoolsInfos.module.css";

const SchoolsInfos = ({ school }) => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const request = user.request.find((request) => request.school === id);
  let userHasRequested = false;

  for (let i = 0; i < user.request.length; i++) {
    const request = user.request[i];
    if (request.school === id && request.user === user.id) {
      userHasRequested = true;
      break;
    }
  }

  return (
    <div className={classes.container_details}>
      {!school?.imgPath ? (
        <div className={classes.container_img_details}>
          <img src={schoolIcon} alt="school" />
        </div>
      ) : (
        <div className={classes.container_img_details}>
          <img
            src={`${URL}/images/${school?.imgPath}`}
            alt="profile"
          />
        </div>
      )}
      <h1 className={classes.school_name}>
        {school?.nameUpdate ? school?.nameUpdate : school?.name}
      </h1>
      <div className={classes.container_infos_global}>
        <div className={classes.container_info}>
          <div className={classes.container_info_icon}>
            <Public sx={{ color: "#696969" }} />
            <span className={classes.school_info_text}>
              {school?.continentUpdate
                ? school?.continentUpdate
                : school?.continent}
            </span>
          </div>
          <div className={classes.container_info_icon}>
            <Flag sx={{ color: "#696969" }} />
            <span className={classes.school_info_text}>
              {school?.countryUpdate ? school?.countryUpdate : school?.country}
            </span>
          </div>
          {school?.cityUpdate ? (
            <div className={classes.container_info_icon}>
              <LocationCity sx={{ color: "#696969" }} />
              <span className={classes.school_info_text}>
                {school?.cityUpdate ? school?.cityUpdate : school?.city}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={classes.container_info}>
          <div className={classes.container_info_icon}>
            <LocationOn sx={{ color: "#696969" }} />
            <span className={classes.school_info_text}>
              {school?.addressUpdate ? school?.addressUpdate : school?.address}
            </span>
          </div>
        </div>
      </div>
      {school?.description && (
        <>
          <h5 className={classes.title__desc}>A propos de nous</h5>
          <div className={classes.container_desc}>
            <p>{school?.description}</p>
          </div>
        </>
      )}
      {request && request.status === 1 ? (
        <div className={classes.container_link_validate}>
          <Link to={`/school/${school?.id}/request/${request.id}`}>
            Votre demande à été validée
          </Link>
        </div>
      ) : (
        !userHasRequested ? (
          <div className={classes.container_link}>
            <Link to={`/school/${school?.id}/request`}>
              Cette fiche vous appartient ?
            </Link>
          </div>
        ) : (
          <div className={classes.container_link_hasrequest}>
            <Link to={`/school/${school?.id}/request`}>
              Vous avez déja fait une demande pour cet établissement
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default SchoolsInfos;
