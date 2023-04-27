import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import schoolIcon from "../../img/school.png";
import classes from "./ResultsPage.module.css";

const ResultsPage = () => {
  const results = useSelector((state) => state.searchResults);

  console.log(results);

  return (
    <div className={classes.container_results}>
      <div className={classes.container_card}>
        {results?.results.schools.map((result) => (
          <Link to={`/school/${result._id}`} key={result._id}>
          <div className={classes.card_item}>
            <div className={classes.container_img}>
              {result.imgPath ? (<img
                src={`http://159.65.53.97:5000/images/${result.imgPath}`}
                alt={result.nameUpdate ? result.nameUpdate : result.name}
              />) : 
              (
              <img src={schoolIcon} alt="ecole"/>
              )}
            </div>
            <div className={classes.container_infos}>
              <span className={classes.name}>
                {result.nameUpdate ? result.nameUpdate : result.name}
              </span>
              <span className={classes.country}>
                {result.continentUpdate
                  ? result.continentUpdate
                  : result.continent}{" "}
                / {result.countryUpdate ? result.countryUpdate : result.country}
              </span>
              <span className={classes.city}>
                {result.area || result.areaUpdate ? `${result.area} / ${result.city}` : result.cityUpdate}
              </span>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
