import React from "react";
import MainHeader from "./MainHeader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Avatar from "../UIElements/Avatar";
import SearchBar from "../UIElements/SearchBar";

const MainNavigation = () => {
  const user = useSelector((state) => state.user);

  return (
    <MainHeader>
      <div className={classes.mainNavigation__container_item}>
        <div className={classes.mainNavigation__container_title_avatar}>
          <h1 className={classes.mainNavigation__title}>
            <Link to="/">EduKarta</Link>
          </h1>
          {user ? (
            <div className={classes.container__avatar_logout}>
              <span>Bonjour {user.firstname}</span>
              <Avatar userId={user.id} image={user.imagePath} />
            </div>
          ) : (
            <Link to="/register">Sign up / Login</Link>
          )}
        </div>
        <SearchBar />
      </div>

      <div className={classes.mainNavigation__container_item_desktop}>
        <div className={classes.mainNavigation__container_title_avatar}>
          <h1 className={classes.mainNavigation__title}>
            <Link to="/">EduKarta</Link>
          </h1>
          <SearchBar />
          {user ? (
            <div className={classes.container__avatar_logout}>
              <span>Bonjour {user.firstname}</span>
              <Avatar userId={user.id} image={user.imagePath} />
            </div>
          ) : (
            <Link to="/register">Sign up / Login</Link>
          )}
        </div>
      </div>
    </MainHeader>
  );
};

export default MainNavigation;
