import React from "react";
import CardSugest from "../../../shared/components/UIElements/CardSugest";
import classes from "./CardSugestList.module.css";

const CardSugestList = () => {
  const schools = [
    {
      name: "Clark Shaw Magnet School",
      original_name: "",
      acronym: "",
      imgPath: "https://lh5.googleusercontent.com/p/AF1QipPkgdxI8ho-S2VpBNZS2nV-MrVT-ItgDbW2GewV=w408-h438-k-no",
      address: "5960 Arlberg Street, Mobile, AL, 36608",
      continent: "north-america",
      country: "usa",
      area: "alabama",
      city: "mobile",
      description: "",
      foundationDate: "",
      level: "5-8",
      language: "",
      sector: "Public district",
      gender: "",
      religion: "",
      international: "",
    },
    {
      name: "Old Shell Creative Performing Art",
      original_name: "",
      acronym: "",
      imgPath: "https://lh5.googleusercontent.com/p/AF1QipPTFp9-5DbhKPyVmlQ0qd504s96dbJZfGLgu4Xf=w408-h544-k-no",
      address: "3160 Heather Street, Mobile, AL, 36607",
      continent: "north-america",
      country: "usa",
      area: "alabama",
      city: "mobile",
      description: "",
      foundationDate: "",
      level: "K-5",
      language: "",
      sector: "Public district",
      gender: "",
      religion: "",
      international: "",
    },
    {
      name: "Phillips Preparatory Middle School",
      original_name: "",
      acronym: "",
      imgPath: "https://lh5.googleusercontent.com/p/AF1QipPkgdxI8ho-S2VpBNZS2nV-MrVT-ItgDbW2GewV=w408-h438-k-no",
      address: "3255 Old Shell Road, Mobile, AL, 36607",
      continent: "north-america",
      country: "usa",
      area: "alabama",
      city: "mobile",
      description: "",
      foundationDate: "",
      level: "6-8",
      language: "",
      sector: "Public district",
      gender: "",
      religion: "",
      international: "",
    },
    {
      name: "Booker T Washington Magnet High School",
      original_name: "",
      acronym: "",
      imgPath: "https://lh5.googleusercontent.com/p/AF1QipPkgdxI8ho-S2VpBNZS2nV-MrVT-ItgDbW2GewV=w408-h438-k-no",
      address:
        "2 awardsAwards & BadgesCollege Success Award2021, 2020See all winners in Alabama",
      continent: "north-america",
      country: "usa",
      area: "alabama",
      city: "2020see all winners in alabama",
      description: "",
      foundationDate: "",
      level: "9-12",
      language: "",
      sector: "Public district",
      gender: "",
      religion: "",
      international: "",
    },
  ];

  return(
    <section className={classes.CardSugest__container}>
        {schools.map((school) => (
            <div className={classes.CardSugest__container_card}>
                <CardSugest
                    img={school.imgPath}
                    name={school.name}
                    continent={school.continent}
                    country={school.country}
                    area={school.area}
                    city={school.city}
                    adress={school.address}
                />
            </div>
        ))}
    </section>
  ) 
};

export default CardSugestList;
