import React, {useEffect, useState} from "react";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import {setSchools} from "../../shared/state/store.js";
import { useDispatch, useSelector } from "react-redux";

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools);

  const fetchSchools = async () => {
    const responseData = await fetch("http://localhost:5000/api/v1/schools", {
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
      <Map type="homepage" schools={schools}/>
      <SchoolList type="noWrap" size="default" schools={schools} numberOfSchools={5} />
      <SchoolList title="établissements populaires" size="big" schools={schools} numberOfSchools={8} />
    </section>
  );
};

export default HomePage;
