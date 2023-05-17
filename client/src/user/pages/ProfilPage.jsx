import React, { useEffect } from "react";
import classes from "./ProfilPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { setLogout } from "../../shared/state/store";
import { useNavigate } from "react-router-dom";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Button from "../../shared/components/FormElements/Button";
import SectionProfil from "../components/ProfilPage/SectionProfil";

const ProfilPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom, rgba(54, 84, 117, 0.5) 0%, white 40%)";

    return () => {
      // Réinitialiser le style du corps lorsque le composant est démonté
      document.body.style.background = "";
    };
  }, []);

  if (!user) return null;
  console.log(user.bannerPath);
  return (
    <>
      <div className={classes.container_navigation}>
        <MainNavigation type="profil" />
      </div>
      <div className={classes.containerProfil}>
        <div className={classes.container_info}>
          <SectionProfil
            title="My account"
            titlePage={isSmallScreen ? "" : "Profil"}
            name={`Hi, ${user.firstname}`}
            nameDestop={`${user.firstname} ${user.lastname}`}
            subtitle="My informations"
            id={user.id}
            image={user.imagePath}
            bannerImage={user.bannerPath}
            user={user}
          />
          <div className={classes.container_logout_btn}>
            <Button
              onClick={() => {
                dispatch(setLogout());
                navigate("/");
              }}
              big
            >
              Lougout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilPage;
