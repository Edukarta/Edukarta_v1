import React, { useEffect, useState } from "react";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import Suggest from "../components/Homepage/Suggest";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import classes from "./HomePage.module.css";

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
 
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(52); // Nombre d'écoles par page

  const fetchSchools = async () => {
    try {
      const responseData = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const allSchools = await responseData.json();
   
  
      setSchools((prevSchools) => {
        const updatedSchools = [...prevSchools];
  
      
        allSchools.schools.forEach((newSchool) => {
          if (!prevSchools.some((prevSchool) => prevSchool.id === newSchool.id)) {
            updatedSchools.push(newSchool);
          }
        });
  
        return updatedSchools;
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleScroll = async () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollBottom = scrollTop + windowHeight;
  
    // Charger de nouvelles données lorsque l'utilisateur atteint la fin de la page
    if (scrollBottom >= 0.9 * documentHeight) {
      setPage((prevPage) => prevPage + 1);
      await fetchSchools(); // Attendre que les nouvelles données soient chargées
    }
  };

  useEffect(() => {
    fetchSchools();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <>
    <header className={classes.container_navigation}>
      <MainNavigation/>
    </header>
    <section>
      <Map type="homepage" schools={schools} />
      <Suggest schools={schools} firstSchool={0} numberOfSchools={3} title="Notable Universities"/>
      <Suggest schools={schools} firstSchool={4} numberOfSchools={7} title="Around You" />
      <SchoolList
        schools={schools}
      />
    </section>

    </>
  );
};

export default HomePage;
