import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { useSelector, useDispatch } from "react-redux";
import { setSearchResults, setQuery } from "../../state/store";
import { NotificationsNone, ShoppingCart } from "@mui/icons-material/";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Avatar from "../UIElements/Avatar";
import SearchBar from "../UIElements/SearchBar";
import { callApi } from "../../../utils/apiUtils";

const MainNavigation = ({ type }) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
      // const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/schools/search?query=${searchQuery}`,"GET")
      const response =await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/search?query=${searchQuery}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const statusCode = await response.status;
      if(statusCode ==200){
        dispatch(setSearchResults({ results: data }));
        dispatch(setQuery(searchQuery));
        console.log(data.status);
        navigate("/searchResult");
      }
      else{
        console.error("Fail to fetch data");
      }

  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <MainHeader type={type}>
      <div className={classes.mainNavigation__container_item}>
        <div className={classes.mainNavigation__container_title_avatar}>
          <h1 className={classes.mainNavigation__title}>
            <Link to="/">EduKarta</Link>
          </h1>
          {user ? (
            <>
              <div className={classes.container__avatar_logout}>
                <span>Hello {user.firstname}</span>
                <Avatar
                  userId={user._id}
                  image={user.imagePath}
                  link={`/profil/${user._id}`}
                />
                <div className={classes.container_icon_notification}>
                  <NotificationsNone sx={{ color: "white" }} />
                </div>
                <div
                  className={classes.container_icon_notification}
                  onClick={() => navigate("/paiement")}
                >
                  {cart && cart.length > 0 && (
                    <div className={classes.cart_item_number}>
                      <h6>{cart.length}</h6>
                    </div>
                  )}
                  <ShoppingCart sx={{ color: "white" }} />
                </div>
              </div>
            </>
          ) : (
            <Link to="/register">Sign up / Login</Link>
          )}
        </div>
        {type !== "profil" && (
          <SearchBar
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleSearch}
          />
        )}
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
            <>
              <div className={classes.container__avatar_logout}>
              <span>Hello {user.firstname}</span>
                <Avatar
                  userId={user._id}
                  image={user.imagePath}
                  link={`/profil/${user._id}`}
                />
                <div className={classes.container_icon_notification}>
                  <NotificationsNone sx={{ color: "white" }} />
                </div>
                <div
                  className={classes.container_icon_notification}
                  onClick={() => navigate("/paiement")}
                >
                  {cart && cart.length > 0 && (
                    <div className={classes.cart_item_number}>
                      <h6>{cart.length}</h6>
                    </div>
                  )}
                  <ShoppingCart sx={{ color: "white" }} />
                </div>
              </div>
            </>
          ) : (
            <Link to="/register">Sign up / Login</Link>
          )}
        </div>
      </div>
    </MainHeader>
  );
};

export default MainNavigation;
