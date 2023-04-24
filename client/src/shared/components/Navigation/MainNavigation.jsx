import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { useSelector, useDispatch } from "react-redux";
import { setSearchResults } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Avatar from "../UIElements/Avatar";
import SearchBar from "../UIElements/SearchBar";

const MainNavigation = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/schools/search?query=${searchQuery}`, 
      {
        method: "GET",
      }
      );
      const data = await response.json();
      dispatch(setSearchResults({ results: data }));
      console.log(data);
      navigate("/searchResult");
    } catch (error) {
      console.error(error);
    }
  };

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
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={handleSearch}
        />
      </div>

      <div className={classes.mainNavigation__container_item_desktop}>
        <div className={classes.mainNavigation__container_title_avatar}>
          <h1 className={classes.mainNavigation__title}>
            <Link to="/">EduKarta</Link>
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleSearch}
          />
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
