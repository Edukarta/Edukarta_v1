import React from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useState} from "react";
import Avatar from "../UIElements/Avatar";
import SearchBar from "../UIElements/SearchBar";

const MainNavigation = () => {
  const [isLoggedIn, setIsLOggedIn] = useState(false)
  return (
    <MainHeader>
      <div className={classes.mainNavigation__container_item}>
        <div className={classes.mainNavigation__container_title_avatar}>
          <h1 className={classes.mainNavigation__title}>
            <Link to="/">EduKarta</Link>
          </h1>
          {isLoggedIn ? <Avatar /> : <Link to="/register">Sign up / Login</Link>}
        </div>
        <SearchBar />
      </div>
    </MainHeader>
  );
};

export default MainNavigation;
