import React, { useRef, useState } from "react";
import Card from "../../../shared/components/UIElements/Card";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../shared/state/store";
import classes from "./SchoolList.module.css";

const SchoolList = ({
  title,
  type,
  size,
  schools,
  numberOfSchools,
  firstSchool,
}) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user?.id);
  const favoriteSchools = useSelector(
    (state) => state.user?.favoriteSchools || []
  );

  const isSchoolFavorite = (schoolId) => {
    return favoriteSchools.includes(schoolId);
  };

  const addRemoveFav = async (schoolId) => {
    const response = await fetch(
      `https://www.edukarta.com/api/v1/user/${id}/${schoolId}`,
      {
        method: "PATCH",
      }
    );
    const savedResponse = await response.json();
    if (savedResponse) {
      dispatch(
        updateUser({
          ...savedResponse.user,
        })
      );
    }
    console.log(savedResponse);
  };

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
          {schools.map((school) => (
            <div key={school.id} className={classes.container_link__card}>
              <Card
                id={school.id}
                iconColor={isSchoolFavorite(school.id) ? true : false}
                onClick={() => addRemoveFav(school.id)}
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
      </section>
    </>
  );
};

export default SchoolList;
