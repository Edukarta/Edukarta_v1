import React from "react";
import Card from "../../../shared/components/UIElements/Card";
import classes from "./SchoolList.module.css";

const SchoolList = ({ title, type, size, schools }) => {
  

  return (
    <>
      <section className={classes.listContainer}>
        <h3 className={classes.listTitle}>{title}</h3>
        <div className={
          type === "noWrap" ? classes.card__container_noWrap : classes.card__container_wrap
        }>
          {schools.map((school) => (
            <Card
              key={school.id}
              id={school.id}
              img={school.imgPath}
              name={school.name}
              continent={school.continent}
              country={school.country}
              area={school.area}
              city={school.city}
              adress={school.address}
              default={size === "default"}
              big={size === "big"}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default SchoolList;
