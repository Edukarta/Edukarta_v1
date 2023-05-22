import React, { useEffect, useState } from "react";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import { setSchools } from "../../shared/state/store.js";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import classes from "./HomePage.module.css";

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools);

  const fetchSchools = async () => {
    const responseData = await fetch(
      `https://www.edukarta.com/api/v1/schools?limit=50&offset=0`,
      {
        method: "GET",
      }
    );
    const allSchools = await responseData.json();
    dispatch(setSchools({ schools: allSchools }));
  };
  
  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <>
    <header className={classes.container_navigation}>
      <MainNavigation/>
    </header>
    <section>
      <Map type="homepage" schools={schools} />
      <SchoolList
        schools={schools}
        firstSchool={0}
        numberOfSchools={100}
      />
    </section>

    </>
  );
};

export default HomePage;
