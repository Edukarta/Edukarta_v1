import React from "react";
import classes from "./ProfilPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../shared/state/store";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import SectionProfil from "../components/ProfilPage/SectionProfil";

const ProfilPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
