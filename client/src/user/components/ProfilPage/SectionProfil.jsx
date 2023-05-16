import React from "react";
import CardProfil from "./CardProfil";
import {
  AccountBalanceWallet,
  FavoriteBorder,
  MenuBook,
  ArrowForwardIos,
  Settings,
  Logout,
} from "@mui/icons-material/";
import { useMediaQuery } from "@mui/material";
import Avatar from "../../../shared/components/UIElements/Avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../shared/state/store";
import classes from "./SectionProfil.module.css";

const SectionProfil = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(min-width: 1080px)");

  return (
    <section>
      <div className={classes.container_item}>
        <h2 className={classes.title}>{props.titlePage}</h2>
        <div>
          <CardProfil
            text={props.name}
            icon={
              !isSmallScreen ? (
                <Avatar image={props.image} normal />
              ) : (
                <Avatar image={props.image} big />
              )
            }
            big
          />
        </div>
      </div>
      <div className={classes.container_item_profil}>
        <h2 className={classes.section_account_title}>{props.title}</h2>
        <div className={classes.container_profil_section}>
          <div
            className={classes.card_profil_item}
            onClick={() => navigate(`/profil/${props.id}/details`)}
          >
            <CardProfil
              text="Parameters"
              icon={<Settings sx={{ color: "#555555", fontSize: "30px" }} />}
              arrow={
                !isSmallScreen && (
                  <ArrowForwardIos
                    sx={{ color: "#555555", fontSize: "18px" }}
                  />
                )
              }
              normal
            />
          </div>
          <div className={classes.card_profil_item}>
            <CardProfil
              text="My favorites"
              icon={
                <FavoriteBorder sx={{ color: "#555555", fontSize: "30px" }} />
              }
              arrow={
                !isSmallScreen && (
                  <ArrowForwardIos
                    sx={{ color: "#555555", fontSize: "18px" }}
                  />
                )
              }
              normal
            />
          </div>
          <div className={classes.card_profil_item}>
            <CardProfil
              text="My Classes"
              icon={<MenuBook sx={{ color: "#555555", fontSize: "30px" }} />}
              arrow={
                !isSmallScreen && (
                  <ArrowForwardIos
                    sx={{ color: "#555555", fontSize: "18px" }}
                  />
                )
              }
              normal
            />
          </div>
          <div className={classes.card_profil_item}>
            <CardProfil
              text="Wallet"
              icon={
                <AccountBalanceWallet
                  sx={{ color: "#555555", fontSize: "30px" }}
                />
              }
              arrow={
                !isSmallScreen && (
                  <ArrowForwardIos
                    sx={{ color: "#555555", fontSize: "18px" }}
                  />
                )
              }
              normal
            />
          </div>
          <div
            className={classes.card_profil_item_logout}
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
          >
            <Logout sx={{ color: "white", fontSize: "30px" }} />
            <h6 className={classes.card_profil_logout_text}>Logout</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProfil;
