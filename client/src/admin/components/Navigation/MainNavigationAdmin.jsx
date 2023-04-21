import React from 'react';
import MainHeader from './MainHeaderAdmin';
import { Link } from 'react-router-dom';
import classes from "./MainNavigationAdmin.module.css";

const MainNavigation = () => {
  return (
    <MainHeader>
        <nav className={classes.container__admin_navbar}>
           <Link to="/"><h1>Edukarta Admin</h1></Link>
           <Link to="/">Stats</Link>
        </nav>
    </MainHeader>
  )
}

export default MainNavigation