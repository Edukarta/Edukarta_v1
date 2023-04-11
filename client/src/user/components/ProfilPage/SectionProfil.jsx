import React from "react";
import CardProfil from "./CardProfil";
import {
  AccountBalanceWallet,
  FavoriteBorder,
  MenuBook,
  ArrowForwardIos,
} from "@mui/icons-material/";
import Avatar from "../../../shared/components/UIElements/Avatar";
import classes from "./SectionProfil.module.css";

const SectionProfil = (props) => {
  return (
    <section>
      <div className={classes.container_item}>
        <h2 className={classes.title}>{props.titlePage}</h2>
        <CardProfil
          text={props.name}
          sub="Afficher Profil"
          icon={<Avatar />}
          arrow={<ArrowForwardIos sx={{ color: "#333", fontSize: "18px" }} />}
        />
      </div>
      <div>
        <h2>{props.title}</h2>
        <CardProfil
          text="Mes favoris"
          icon={<FavoriteBorder sx={{ color: "#333", fontSize: "30px" }} />}
          arrow={<ArrowForwardIos sx={{ color: "#333", fontSize: "18px" }} />}
        />
        <CardProfil
          text="Mes Cours"
          icon={<MenuBook sx={{ color: "#333", fontSize: "30px" }} />}
          arrow={<ArrowForwardIos sx={{ color: "#333", fontSize: "18px" }} />}
        />
        <CardProfil
          text="Wallet"
          icon={
            <AccountBalanceWallet sx={{ color: "#333", fontSize: "30px" }} />
          }
          arrow={<ArrowForwardIos sx={{ color: "#333", fontSize: "18px" }} />}
        />
      </div>
    </section>
  );
};

export default SectionProfil;
