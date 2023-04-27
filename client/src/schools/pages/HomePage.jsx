import React, { useEffect, useState } from "react";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import { setSchools } from "../../shared/state/store.js";
import { useDispatch, useSelector } from "react-redux";
import classes from "./HomePage.module.css"

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools);

  const fetchSchools = async () => {
    const responseData = await fetch(`http://159.65.53.97:5000/api/v1/schools`, {
      method: "GET",
    });
    const allSchools = await responseData.json();
    dispatch(setSchools({ schools: allSchools }));
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <section>
      <Map type="homepage" schools={schools} />
      <div className={classes.container_slider}>
        <SchoolList
          type="noWrap"
          size="default"
          schools={schools}
          numberOfSchools={5}
        />
      </div>
      <SchoolList
        title="établissements populaires"
        size="big"
        schools={schools}
        numberOfSchools={30}
      />
    </section>
  );
};

export default HomePage;
