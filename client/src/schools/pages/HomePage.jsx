import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import Suggest from "../components/Homepage/Suggest";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import classes from "./HomePage.module.css";

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
  const [schools, setSchools] = useState([]);
  const [popularSchools, setPopularSchools] = useState([]);
  const [country, setCountry] = useState(localStorage.getItem('country'));
  const [page, setPage] = useState(1);
  const [limit] = useState(21);
  const [isFetching, setIsFetching] = useState(false);

  const getUserLocation = async () => {
    try {
      const userIPResponse = await axios.get('https://api.ipify.org?format=json');
      const userIP = userIPResponse.data.ip;
    
      const geoResponse = await axios.get(`https://get.geojs.io/v1/ip/geo/${userIP}.json`);
      const geoData = geoResponse.data;
      const userCountry = geoData.country;
      setCountry(userCountry);
      localStorage.setItem('country', userCountry);
    
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchPopularSchools();
  }, []);

  useEffect(() => {
    
    fetchSchools();
    
  }, [country]);


  const fetchSchools = async () => {
    try {
      setIsFetching(true);
          const responseData = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools?country=${country}&page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );

      const allSchools = await responseData.json();

      setSchools((prevSchools) => {
        const updatedSchools = [...prevSchools];

        if (allSchools && allSchools.schools) {
          allSchools.schools.forEach((newSchool) => {
            if (
              !prevSchools.some((prevSchool) => prevSchool.id === newSchool.id)
            ) {
              updatedSchools.push(newSchool);
            }
          });
        }

        return updatedSchools;
      });

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !isFetching) {
      fetchSchools();
    }
  };

  const fetchPopularSchools = async () => {
    try {
          const responseData = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/popular`,
        {
          method: "GET",
        }
      );


      const allSchools = await responseData.json(); 
      console.log(allSchools);
      setPopularSchools((prevSchools) => {
        const updatedSchools = [...prevSchools];

        if (allSchools && allSchools.schools) {
          allSchools.schools.forEach((newSchool) => {
            if (
              !prevSchools.some((prevSchool) => prevSchool.id === newSchool.id)
            ) {
              updatedSchools.push(newSchool);
            }
          });
        }

        return updatedSchools;
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation />
      </header>
      <section>
        <Map type="homepage" schools={schools} />
        <Suggest
          schools={popularSchools}
          subText="Most popular schools among Edukarta users"
          title="Notable Universities"
        />
        <SchoolList title="Explore Schools in" subText1="Schools in" subText2="have a lot to offer." country={country} schools={schools} />
      </section>
    </>
  );
};

export default HomePage;
