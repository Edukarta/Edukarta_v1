import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ProfilDetails.module.css";

const ProfilDetails = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setUser(data.user);
    console.log(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;

  return (
    <div className={classes.containerProfil}>
      <div className={classes.container_infos}>
        <h1>
          Bonjour {user.firstname} {user.lastname}
        </h1>
        <h1>id : {user.id}</h1>
        <h1> adresse : {user.address}</h1>
        <h1> tel : {user.phone}</h1>
        <h1> img : {user.imagePath}</h1>
      </div>
    </div>
  );
};

export default ProfilDetails;
