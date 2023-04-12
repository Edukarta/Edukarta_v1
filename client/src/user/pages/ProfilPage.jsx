import React, { useState, useEffect } from "react";
import classes from "./ProfilPage.module.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../shared/state/store";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import SectionProfil from "../components/ProfilPage/SectionProfil";

const ProfilPage = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className={classes.container_info}>
        <SectionProfil
          title="Mon Compte"
          titlePage="Profil"
          name={user.firstname}
          subtitle="Afficher Profil"
          id={user.id}
          image={user.imagePath}
        />
        <Button
          onClick={() => {
            dispatch(setLogout());
            navigate("/");
          }}
          big
        >
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default ProfilPage;
