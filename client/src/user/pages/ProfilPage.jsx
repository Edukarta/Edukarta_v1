import React, {useEffect} from "react";
import classes from "./ProfilPage.module.css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { setLogout } from "../../shared/state/store";
import { useNavigate } from "react-router-dom";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Button from "../../shared/components/FormElements/Button";
import SectionProfil from "../components/ProfilPage/SectionProfil";

const ProfilPage = () => {
  const user = useSelector((state) => state.user);
  const titlePage = `${user.firstname} Profil Page`
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) return null;

  return (
    <>
    <Helmet>
      <title>{titlePage}</title>
    </Helmet>
      <header className={classes.container_navigation}>
        <MainNavigation type="profil" />
      </header>
      <main className={classes.containerProfil}>
        <section className={classes.container_info}>
          <SectionProfil
            title="My account"
            titlePage={isSmallScreen ? "" : "Profil"}
            name={`Hi, ${user.firstname}`}
            nameDestop={`${user.firstname} ${user.lastname ? user.lastname : ""}`}
            subtitle="My informations"
            id={user._id}
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
        </section>
      </main>
    </>
  );
};

export default ProfilPage;
