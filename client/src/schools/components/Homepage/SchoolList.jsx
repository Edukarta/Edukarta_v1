import React, { useRef, useState } from "react";
import Card from "../../../shared/components/UIElements/Card";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import classes from "./SchoolList.module.css";

const SchoolList = ({ title, type, size, schools, numberOfSchools, firstSchool }) => {
  return (
    <>
      <section className={classes.listContainer}>
        <h3 className={classes.listTitle}>{title}</h3>
        <div
          className={
            type === "noWrap"
              ? classes.card__container_noWrap
              : classes.card__container_wrap
          }
        >
      
          {schools.schools?.slice(firstSchool, numberOfSchools).map((school) => (
            <Link key={school.id} to={`/school/${school.id}`} className={classes.container_link__card}>
              <Card
                id={school.id}
                img={school.imgPath}
                name={school.nameUpdate ? school.nameUpdate : school.name}
                continent={
                  school.continentUpdate
                    ? school.continentUpdate
                    : school.continent
                }
                country={
                  school.countryUpdate ? school.countryUpdate : school.country
                }
                area={school.areaUpdate ? school.areaUpdate : school.area}
                city={school.cityUpdate ? school.cityUpdate : school.city}
                default={size === "default"}
                big={size === "big"}
              />
            </Link>
          ))}
        </div>
        {/* {type === "noWrap" && (
          <div className={classes.container_arrow_right}>
            <ArrowForwardIos onClick={() => handleClick("right")} sx={{color: "white", fontSize: "28px"}} />
          </div>
        )} */}
      </section>
    </>
  );
};

export default SchoolList;
