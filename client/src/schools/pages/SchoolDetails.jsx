import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import SchoolsProfil from "../components/SchoolDetails/SchoolsProfil";
import classes from "./SchoolsDetails.module.css";
import { callApi } from "../../utils/apiUtils";

const SchoolDetails = () => {
  const [school, setSchool] = useState();
  const { id } = useParams();

  const getSchool = async () => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/schools/${id}`,"GET")
    // await fetch(
    //   `${process.env.REACT_APP_API_URL}/api/v1/schools/${id}`,
    //   {
    //     method: "GET",
    //   }
    // );
    const data = await response;
    setSchool(data.data.school);
  };
  useEffect(() => {
    getSchool();
  }, [id]);
  //   if (!user) return null;

  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation type="profil" />
      </header>
      <section>
        {/* {school && <SchoolsInfos school={school} getSchool={getSchool} />} */}
        {school && <SchoolsProfil school={school} getSchool={getSchool} />}
      </section>
    </>
  );
};

export default SchoolDetails;
