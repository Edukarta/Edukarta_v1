import React, {useState, useEffect} from "react";
import classes from "./ProfilPage.module.css";
import { useParams } from "react-router-dom";


const ProfilPage = () => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  return (
    <div className={classes.containerProfil}>
      <div className={classes.container_info}>
        <h1>Hello {user.firstname} {user.lastname}</h1>
      </div>
    </div>
  );
};

export default ProfilPage;
