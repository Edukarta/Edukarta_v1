import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useLocation,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { updateUser } from "../../shared/state/store";
import { SentimentVeryDissatisfied } from "@mui/icons-material/";
import { useDispatch } from "react-redux";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import starFav from "../../img/star_fav.png";
import schoolIcon from "../../img/img_school.jpg";
import classes from "./FavoritePage.module.css";
import { callApi } from "../../utils/apiUtils";

const FavoritePage = () => {
  const [favoriteSchools, setFavoriteSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isActive = (linkPath) => {
    return pathname === linkPath ? classes.active : "";
  };

  //Fonction qui récupère les favoris
  const getFavorite = async () => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}/favorite`,"GET")
    const data = await response;
    const statusCode = data.status;
    if(statusCode === 429 || statusCode ===403){
      navigate("/captcha")
    }
    const savedResponse = data.data
    if (savedResponse) {
      setFavoriteSchools(savedResponse);
    }
  };

  //Fonction pour supprimer les favoris de la liste
  const addRemoveFav = async (schoolId) => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}/${schoolId}`,"PATCH")
    const savedResponse = await response;
    const statusCode = savedResponse.status;
    if(statusCode === 429 || statusCode ===403){
      navigate("/captcha")
    }
    if (savedResponse) {
      dispatch(
        updateUser({
          ...savedResponse.data.user,
        })
      );
    }
    console.log(savedResponse.data);
    getFavorite();
  };

 
  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorite();
  }, []);


  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation type="profil" />
      </header>
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
          <Modal
            text="Remove this school from my favorites"
            show={modalIsOpen}
            remove={() => {
              addRemoveFav(selectedSchoolId);
              setModalIsOpen(false);
            }}
            hideModal={() => setModalIsOpen(false)}
          />
          <div className={classes.container_title_favorite}>
            {favoriteSchools.length >= 1 ? (
              <h3>{`You added ${favoriteSchools.length} ${
                favoriteSchools.length > 1 ? "schools" : "school"
              }`}</h3>
            ) : (
              <div className={classes.container_empty_text}>
                <div className={classes.container_empty_text_icon}>
                  <h3>No favorites yet</h3>
                  <SentimentVeryDissatisfied
                    sx={{ color: "#15273c", fontSize: "35px" }}
                  />
                </div>
                <Button onClick={() => navigate("/")}>Add here</Button>
              </div>
            )}
          </div>
          <div className={classes.container_card}>
            {favoriteSchools.map((school, index) => (
              <div className={classes.card_link} key={index}>
                <div
                  className={classes.icon_fav}
                  onClick={() => {
                    setSelectedSchoolId(school._id);
                    setModalIsOpen(true);
                  }}
                >
                  <img src={starFav} alt="" />
                </div>
                <Link to={`/school/${school._id}`}>
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
