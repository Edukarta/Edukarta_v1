import React from "react";
import Card from "../../../shared/components/UIElements/Card";
import { Grow } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../shared/state/store";
import classes from "./SchoolList.module.css";
import { useNavigate } from "react-router-dom";

const SchoolList = ({
  title,
  country,
  subText1,
  subText2,
  type,
  size,
  schools,
  numberOfSchools,
  firstSchool,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const favoriteSchools = useSelector(
    (state) => state.user?.favoriteSchools || []
  );
  const isSchoolFavorite = (schoolId) => {
    return favoriteSchools.includes(schoolId);
  };

  const addRemoveFav = async (schoolId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/user/${user._id}/${schoolId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const savedResponse = await response.json();
    if (savedResponse) {
      dispatch(
        updateUser({
          ...user,
          ...savedResponse.user,
        })
      );
    }
  };

  return (
    <>
      <section className={classes.listContainer}>
        <h3 className={classes.listTitle}>
          {title} {country}
        </h3>
        <h4 className={classes.sub_text}>
          {subText1} {country} {subText2}
        </h4>
        <div
          className={
            type === "noWrap"
              ? classes.card__container_noWrap
              : classes.card__container_wrap
          }
        >
          {schools.map((school, index) => (
            <Grow in={true} key={school.id} timeout={(index + 1) * 30}>
              <div  className={classes.container_link__card}>
                <Card
                  id={school.id}
                  iconColor={isSchoolFavorite(school.id) ? true : false}
                  onClick={() => addRemoveFav(school.id)}
                  link={`/school/${school.id}`}
                  img={
                    school.imgPath1
                      ? school.imgPath1.startsWith("http")
                        ? school.imgPath1
                        : `${process.env.REACT_APP_URL}/images/${school.imgPath1}`
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
            </Grow>
          ))}
        </div>
      </section>
    </>
  );
};

export default SchoolList;
