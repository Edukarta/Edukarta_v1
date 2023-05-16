import React from "react";
import classes from "./ProfilPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { setLogout } from "../../shared/state/store";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import SectionProfil from "../components/ProfilPage/SectionProfil";

const ProfilPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");

  if (!user) return null;
  return (
    <div className={classes.containerProfil}>
      <div className={classes.container_info}>
        <SectionProfil
          title="My account"
          titlePage={isSmallScreen ? "" : "Profil"}
          name={`Hi, ${user.firstname}`}
          subtitle="My informations"
          id={user.id}
          image={user.imagePath}
        />
        <div className={classes.container_logout_btn}>
          <Button
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
            big
            danger
          >
            Lougout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
