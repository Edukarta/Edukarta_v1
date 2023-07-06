import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Map from "../../shared/components/UIElements/Map";
import SchoolList from "../components/Homepage/SchoolList";
import { callApi } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import Suggest from "../components/Homepage/Suggest";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import classes from "./HomePage.module.css";

//FECTHER LES DONNEES DANS CE COMPOSANT PASSEES EN PROPS A SCHOOLLIST
const HomePage = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [popularSchools, setPopularSchools] = useState([]);
  const [country, setCountry] = useState(localStorage.getItem("country"));
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [isFetching, setIsFetching] = useState(false);

  const getUserLocation = async () => {
    try {
      const userIPResponse = await axios.get(
        "https://api.ipify.org?format=json"
      );
      const userIP = userIPResponse.data.ip;

      const geoResponse = await axios.get(
        `https://get.geojs.io/v1/ip/geo/${userIP}.json`
      );
      const geoData = geoResponse.data;
      const userCountry = geoData.country;
      setCountry(userCountry);
      localStorage.setItem("country", userCountry || "France");
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [country]);

  useEffect(() => {
    getUserLocation();
    fetchPopularSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setIsFetching(true);
      const responseData = callApi(
        `${process.env.REACT_APP_API_URL}/api/v1/schools?country=${country}&page=${page}&limit=${limit}`
      );
      const data = await responseData;
      // const statusCode = data.status;
      // if (statusCode === 429 || statusCode === 403) {
      //   navigate("/captcha");
      // }

      const allSchools = await data.data;

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
      const responseData = await callApi(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/popular`,
        "GET"
      );
      const statusCode = await responseData.status;
      if (statusCode === 429 || statusCode === 403) {
        navigate("/captcha");
      }
      const allSchools = await responseData.data;
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
      });
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
      <Helmet>
        <title>EduKarta.com | The Biggest School Database</title>
      </Helmet>
      <header className={classes.container_navigation}>
        <MainNavigation />
      </header>
      <section>
        <Map type="homepage" />
        <Suggest
          schools={popularSchools}
          subText="Ces écoles prisées ont beaucoup à offrir"
          title="Les plus populaires"
        />
        <SchoolList
          title="Écoles en "
          subText1="Découvrez les écoles en"
          country={country}
          schools={schools}
        />
      </section>
    </>
  );
};

export default HomePage;
