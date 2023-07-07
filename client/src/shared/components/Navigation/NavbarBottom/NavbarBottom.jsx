import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import ButtonNavBottom from "./ButtonNavBottom";
import classes from "./NavbarBottom.module.css";
import MapDrawer from "../../UIElements/MapDrawer";
import Map from "../../UIElements/Map";

const NavbarBottom = () => {
  const navigate = useNavigate();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [popularSchools, setPopularSchools] = useState([]);


  return (
    <>
      <div className={classes.navbarBottom__container}>
        <MapDrawer show={drawerIsOpen}>
          <Map type="bottom" />
        </MapDrawer>
        {/* <div className={classes.navbarBottom__container_icon}>
          <Link to="/">
            <House sx={{ fontSize: "40px" }} />
          </Link>
          <Link to="/">
            <Favorite sx={{ fontSize: "40px" }} />
          </Link>
        </div> */}
        <ButtonNavBottom onClick={() => setDrawerIsOpen((prev) => !prev)} />
        {/* <div className={classes.navbarBottom__container_icon}>
          <Link to="/">
            <ImportContacts sx={{ fontSize: "40px" }} />
          </Link>
          <Link to="/">
            <OndemandVideo sx={{ fontSize: "40px" }} />
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default NavbarBottom;
