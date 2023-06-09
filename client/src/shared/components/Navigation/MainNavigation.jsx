import React, { useState, useRef, useEffect } from "react";
import MainHeader from "./MainHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchResults,
  setQuery,
  setPagination,
  setFilters,
} from "../../state/store";
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
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const isFiltering = useSelector((state) => state.isFiltering);
  const limit = useSelector((state) => state.pagination.pageSize);
  const query = useSelector((state) => state.searchQuery);
  const [progress, setProgress] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    setSearchQuery(query || "");
  }, []);

  const handleSearch = async () => {
    setProgress(true);
    if (isFiltering) {
      return;
    }
    const response = callApi(
      `${process.env.REACT_APP_API_URL}/api/v1/schools/search?query=${searchQuery}&page=${currentPage}&perPage=${limit}`,
      "GET"
    );

    const data = await response;
    const statusCode = data.status;
    if (statusCode === 200) {
      dispatch(setSearchResults({ results: data.data }));
      dispatch(setQuery(searchQuery));
      dispatch(
        setPagination({
          currentPage: currentPage,
          totalCount: data.data.totalCount,
          totalPages: data.data.totalPages,
        })
      );
      dispatch(setFilters(data.data.unusedFields));
      navigate("/searchResult");
    }
    setProgress(false);
  };

  //Mise a jour de currentPage
  useEffect(() => {
    currentPageRef.current = currentPage;
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  // Compare la valeur de currentPage
  useEffect(() => {
    if (currentPageRef.current !== currentPage) {
      handleSearch();
    }
  }, [handleSearch]);

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
            progress={progress}
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
            progress={progress}
            onKeyDown={handleKeyDown}
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
