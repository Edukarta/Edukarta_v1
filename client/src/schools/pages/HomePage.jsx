import React from "react";
import Map from "../../shared/components/UIElements/Map";
import CardSugestList from "../components/Homepage/CardSugestList";


const HomePage = () => {
  return (
    <section>
      <Map type="homepage"/>
      <CardSugestList />
    </section>
  );
};

export default HomePage;
