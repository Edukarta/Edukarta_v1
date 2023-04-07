import React from 'react';
import {House, Favorite, OndemandVideo, ImportContacts} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ButtonNavBottom from './ButtonNavBottom';
import classes from "./NavbarBottom.module.css"

const NavbarBottom = () => {
  return (
    <div className={classes.navbarBottom__container}>
        <div className={classes.navbarBottom__container_icon}>
            <Link to="/">
                <House sx={{fontSize: "40px"}}/>
            </Link>
            <Link to="/">
                <Favorite sx={{fontSize: "40px"}}/>
            </Link>
        </div>
        <ButtonNavBottom/>
        <div className={classes.navbarBottom__container_icon}>
            <Link to="/">
                <ImportContacts sx={{fontSize: "40px"}}/>
            </Link>
            <Link to="/">
                <OndemandVideo sx={{fontSize: "40px"}}/>
            </Link>
        </div>
    </div>
  )
}

export default NavbarBottom