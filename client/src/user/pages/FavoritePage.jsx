import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, NavLink } from "react-router-dom";
import { updateUser } from "../../shared/state/store";
import { useDispatch } from "react-redux";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import starFav from "../../img/star_fav.png";
import schoolIcon from "../../img/img_school.jpg";
import classes from "./FavoritePage.module.css";

const FavoritePage = () => {
  const [favoriteSchools, setFavoriteSchools] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isActive = (linkPath) => {
    return pathname === linkPath ? classes.active : "";
  };

  //Fonction qui récupère les favoris
  const getFavorite = async () => {
    const response = await fetch(
      `https://www.edukarta.com/api/v1/user/${id}/favorite`,
      {
        method: "GET",
      }
    );
    const savedResponse = await response.json();
    if (savedResponse) {
      setFavoriteSchools(savedResponse);
    }
  };

  //Fonction pour supprimer mles favoris de la liste
  const addRemoveFav = async (schoolId) => {
    const response = await fetch(
      `https://www.edukarta.com/api/v1/user/${id}/${schoolId}`,
      {
        method: "PATCH",
      }
    );
    const savedResponse = await response.json();
    if (savedResponse) {
      dispatch(
        updateUser({
          ...savedResponse.user,
        })
      );
    }
    console.log(savedResponse)
    getFavorite();
  };
  
  useEffect(() => {
    getFavorite();
  }, []);
  console.log(favoriteSchools);

  return (
    <>
      <div className={classes.container_navigation}>
        <MainNavigation type="profil" />
      </div>
      <div
        className={`${
          favoriteSchools.length <= 3
            ? classes.container_empty
            : classes.container_favorite_body
        }`}
      >
        <div className={classes.container_side_bar}>
          <ul className={classes.container_links}>
            <li>
              <NavLink
                to={`/profil/${id}/favorite`}
                className={() => isActive(`/profil/${id}/favorite`)}
              >
                My schools
              </NavLink>
            </li>
            <li>
              <NavLink>My courses</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.container_fav_item}>
          <div className={classes.container_title_favorite}>
            {favoriteSchools.length >= 1 ? (
              <h3>{`You added ${favoriteSchools.length} ${
                favoriteSchools.length > 1 ? "schools" : "school"
              }`}</h3>
            ) : (
              <h3>No favorites yet</h3>
            )}
          </div>
          <div className={classes.container_card}>
            {favoriteSchools.map((school, index) => (
              <div className={classes.card_link}>
                <div className={classes.icon_fav} onClick={() => addRemoveFav(school._id)}>
                    <img src={starFav} alt="" />
                </div>
                <Link key={index} to={`/school/${school._id}`}>
                  <div className={classes.card_item}>
                    <div className={classes.container_img}>
                      {school.imgPath1 ? (
                        <img
                          src={school.imgPath1}
                          alt={
                            school.nameUpdate ? school.nameUpdate : school.name
                          }
                        />
                      ) : (
                        <img src={schoolIcon} alt="ecole" />
                      )}
                    </div>
                    <div className={classes.container_infos}>
                      <h6 className={classes.name}>
                        {school.nameUpdate ? school.nameUpdate : school.name}
                      </h6>
                      <h6 className={classes.country}>
                        {school.countryUpdate
                          ? school.countryUpdate
                          : school.country}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
