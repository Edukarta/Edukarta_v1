import React, { useRef, useState } from "react";
import Card from "../../../shared/components/UIElements/Card";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import classes from "./SchoolList.module.css";

const SchoolList = ({ title, type, size, schools, numberOfSchools }) => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    const listItemWidth = listRef.current.children[0].offsetWidth;
  const listWidth = listRef.current.offsetWidth;
  const distance = listItemWidth * numberOfSchools;

  if (direction === "left" && slideNumber > 0) {
    setSlideNumber(slideNumber - 1);
    listRef.current.style.transform = `translateX(${
      (slideNumber - 1) * -listItemWidth
    }px)`;
  }

  if (direction === "right" && slideNumber < numberOfSchools - 1) {
    setSlideNumber(slideNumber + 1);
    listRef.current.style.transform = `translateX(${
      (slideNumber + 1) * -listItemWidth
    }px)`;
  }

  // Bloquer le slider si on est arrivé à la dernière slide
  if (
    direction === "right" &&
    slideNumber >= numberOfSchools - 2
  ) {
    setSlideNumber(numberOfSchools - 2);
    listRef.current.style.transform = `translateX(${
      (numberOfSchools - 2) * -listItemWidth
    }px)`;
  }
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
          ref={listRef}
        >
          {schools.schools?.slice(0, numberOfSchools).map((school) => (
            <Link key={school.id} to={`/school/${school.id}`} className={classes.container_link__card}>
              <Card
                id={school.id}
                img={
                  school.imgPath
                    ? `${URL}/images/${school.imgPath}`
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
            </Link>
          ))}
        </div>
        {type === "noWrap" && (
          <div className={classes.container_arrow}>
            <ArrowBackIos onClick={() => handleClick("left")} sx={{color: "#365475", fontSize: "28px"}} />
            <ArrowForwardIos onClick={() => handleClick("right")} sx={{color: "#365475", fontSize: "28px"}} />
          </div>
        )}
      </section>
    </>
  );
};

export default SchoolList;
