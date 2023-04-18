import React, { useState } from "react";
import {
  House,
  Favorite,
  OndemandVideo,
  ImportContacts,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import ButtonNavBottom from "./ButtonNavBottom";
import classes from "./NavbarBottom.module.css";
import MapDrawer from "../../UIElements/MapDrawer";
import { useSelector } from "react-redux";
import Map from "../../UIElements/Map";

const NavbarBottom = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const schools = useSelector((state) => state.schools);

  return (
    <>
      <div className={classes.navbarBottom__container}>
        <MapDrawer show={drawerIsOpen}>
          <Map schools={schools} />
        </MapDrawer>
        <div className={classes.navbarBottom__container_icon}>
          <Link to="/">
            <House sx={{ fontSize: "40px" }} />
          </Link>
          <Link to="/">
            <Favorite sx={{ fontSize: "40px" }} />
          </Link>
        </div>
        <ButtonNavBottom onClick={() => setDrawerIsOpen((prev) => !prev)} />
        <div className={classes.navbarBottom__container_icon}>
          <Link to="/">
            <ImportContacts sx={{ fontSize: "40px" }} />
          </Link>
          <Link to="/">
            <OndemandVideo sx={{ fontSize: "40px" }} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarBottom;
