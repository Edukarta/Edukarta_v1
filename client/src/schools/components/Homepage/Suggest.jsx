import React from "react";
import Card from "../../../shared/components/UIElements/Card";
import classes from "./Suggest.module.css";

const Suggest = ({
  title,
  type,
  size,
  schools,
  numberOfSchools,
  firstSchool,
}) => {
  return (
    <div className={classes.container_suggest}>
      <h3 className={classes.container_suggest_title}>{title}</h3>
      <div
        className={
          type === "noWrap"
            ? classes.card__container_noWrap
            : classes.card__container_wrap
        }
      >
        {schools.slice(firstSchool, numberOfSchools).map((school) => (
          <div key={school.id} className={classes.container_link__card}>
            <Card
              id={school.id}
              link={`/school/${school.id}`}
              img={
                school.imgPath1
                  ? school.imgPath1.startsWith("http")
                    ? school.imgPath1
                    : `http://localhost:5000/images/${school.imgPath1}`
                  : ""
              }
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggest;
