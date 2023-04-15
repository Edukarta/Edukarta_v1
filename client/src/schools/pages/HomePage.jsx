import React, {useEffect, useState} from "react";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import { useDispatch, useSelector } from "react-redux";

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
  const schools = useSelector((state) => state.schools);


  return (
    <section>
      <Map type="homepage"/>
      <SchoolList type="noWrap" size="default" schools={schools} numberOfSchools={5} />
      <SchoolList title="établissements populaires" size="big" schools={schools} numberOfSchools={6} />
    </section>
  );
};

export default HomePage;
