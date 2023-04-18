import React from "react";
import Card from "../../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import classes from "./SchoolList.module.css";

const SchoolList = ({ title, type, size, schools, numberOfSchools }) => {
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
          {schools.schools?.slice(0, numberOfSchools).map((school) => (
            <Link key={school.id} to={`/school/${school.id}`}>
              <Card
                id={school.id}
                img={school.imgPath ? `http://localhost:5000/images/${school.imgPath}` : "" }
                name={school.nameUpdate ? school.nameUpdate : school.name }
                continent={school.continentUpdate ? school.continentUpdate : school.continent}
                country={school.countryUpdate ? school.countryUpdate : school.country}
                area={school.areaUpdate ? school.areaUpdate : school.area}
                city={school.cityUpdate ? school.cityUpdate : school.city}
                adress={school.addressUpdate ? school.addressUpdate : school.address}
                default={size === "default"}
                big={size === "big"}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default SchoolList;
