import React, { useState, useEffect, useRef } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPagination, setFiltersQuery } from "../../shared/state/store";
import { useMediaQuery } from "@mui/material";
import { setSearchResults, setQuery } from "../../shared/state/store";
import FilterDrawer from "../../shared/components/UIElements/FilterDrawer";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material/";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { Link, useNavigate } from "react-router-dom";
import schoolIcon from "../../img/img_school.jpg";
import classes from "./ResultsPage.module.css";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const previousQuery = useSelector((state) => state.searchQuery);
  const results = useSelector((state) => state.searchResults);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [scoIsOpen, setScoIsOpen] = useState(false);
  const [supIsOpen, setSupIsOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { currentPage, totalPages, totalCount, limit } = useSelector(
    (state) => state.pagination
  );
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    dispatch(
      setPagination({
        currentPage: 1,
        totalCount: totalCount,
        totalPages: totalPages,
      })
    );
  }, [selectedFilters]);

  useEffect(() => {
    handleSearch(); // Appeler handleSearch sans argument pour la première exécution
  
    return () => {
      // Nettoyage du useEffect
    };
  }, [currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "left") {
      const currentPageValue = currentPage || 1;
      if (currentPageValue > 1) {
        const newPage = currentPageValue - 1;
        dispatch(setPagination({ currentPage: newPage, totalPages }));
      }
    }
  
    if (direction === "right") {
      const currentPageValue = currentPage || 1;
      const newPage = currentPageValue + 1;
      dispatch(setPagination({ currentPage: newPage, totalPages }));
      
    }
  };

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    if (name === "country") {
      setCountryFilter(value);
    } else if (name === "city") {
      setCityFilter(value);
    } else {
      if (checked) {
        setSelectedFilters([...selectedFilters, value]);
      } else {
        setSelectedFilters(
          selectedFilters.filter((filter) => filter !== value)
        );
      }
    }
  };

  const handleSearch = async (event = null, newCurrentPage = null) => {
    if (event) {
      event.preventDefault();
    }

    const query = selectedFilters.join(",");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/filter?previousQuery=${previousQuery}&query=${query}&page=${currentPage}&perPage=${limit}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(currentPage)
      dispatch(setSearchResults({ results: data }));
      dispatch(
        setPagination({
          currentPage: currentPage,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
        })
      );
      console.log(currentPage)
    } catch (error) {
      console.error(error);
    }
    setCityFilter("");
    setCountryFilter("");
    setDrawerIsOpen(false);
    
  };


  const handleLevelToggle = (type) => {
    if (type === "sco") {
      setScoIsOpen(true);
      setSupIsOpen(false);
    }
    if (type === "sup") {
      setScoIsOpen(false);
      setSupIsOpen(true);
    }
  };

  return (
    <>
      <div className={classes.container_navigation}>
        <MainNavigation />
      </div>
      <section className={classes.global_container}>
        <div className={classes.container_filter_result_page}>
          <button onClick={() => setDrawerIsOpen((prev) => !prev)}>
            Filters{!drawerIsOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </button>
        </div>
        <FilterDrawer show={drawerIsOpen}>
          <form
            className={classes.container_filter_mobile}
            onSubmit={handleSearch}
          >
            <div className={classes.container_title_filter_panel_mobile}>
              <h3>Filter by :</h3>
            </div>

            <div className={classes.container_filter_group_mobile}>
              <h3>Level</h3>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="preschool"
                  name="preschool"
                  value="preschool"
                  onChange={handleFilterChange}
                />
                <label htmlFor="preschool">Preschool</label>
              </div>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="college"
                  name="college"
                  value="college"
                  onChange={handleFilterChange}
                />
                <label htmlFor="college">College</label>
              </div>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="university"
                  name="university"
                  value="university"
                  onChange={handleFilterChange}
                />
                <label htmlFor="university">University</label>
              </div>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="formation_center"
                  name="formation center"
                  value="formation center"
                  onChange={handleFilterChange}
                />
                <label htmlFor="formation center">Formation Center</label>
              </div>
            </div>

            <div className={classes.container_filter_group_mobile}>
              <h3>Sector</h3>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="public"
                  name="public"
                  value="public"
                  onChange={handleFilterChange}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="private"
                  name="private"
                  value="private"
                  onChange={handleFilterChange}
                />
                <label htmlFor="private">Private</label>
              </div>
            </div>

            <div className={classes.container_filter_group_mobile}>
              <h3>Language spoken</h3>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="english"
                  name="english"
                  value="english"
                  onChange={handleFilterChange}
                />
                <label htmlFor="english">English</label>
              </div>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="chinese"
                  name="chinese"
                  value="chinese"
                  onChange={handleFilterChange}
                />
                <label htmlFor="chinese">Chinese</label>
              </div>
              <div className={classes.input_filter_goup_mobile}>
                <input
                  type="checkbox"
                  id="french"
                  name="french"
                  value="french"
                  onChange={handleFilterChange}
                />
                <label htmlFor="french">French</label>
              </div>
            </div>
            <div className={classes.container_btn_filter}>
              <Button big>Apply filters</Button>
            </div>
          </form>
        </FilterDrawer>

        <div className={classes.results_number}>
          <h5 className={classes.number_of_results}>
            {previousQuery} {": "} <span>{totalCount}</span>{" "}
            {totalCount > 1 ? "schools found" : "school found"}
          </h5>
        </div>
        <div className={classes.container_results}>
          <form className={classes.container_filter} onSubmit={handleSearch}>
            <div className={classes.container_title_filter_panel}>
              <h3>Filter by :</h3>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Pays</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={countryFilter}
                  placeholder="Recherche par pays"
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Ville</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={cityFilter}
                  placeholder="Recherche par ville"
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Niveaux</h3>
              <div className={classes.btn_sco_sup}>
                <div className={classes.input_filter_goup}>
                  <input
                    type="radio"
                    id="sco"
                    name="level"
                    value="sco"
                    onChange={() => handleLevelToggle("sco")}
                  />
                  <label htmlFor="sco">Sco</label>
                </div>
                <div className={classes.input_filter_goup}>
                  <input
                    type="radio"
                    id="sup"
                    name="level"
                    value="sup"
                    onChange={() => handleLevelToggle("sup")}
                  />
                  <label htmlFor="sup">Sup</label>
                </div>
              </div>
              {/* SECTION SCO */}
              {scoIsOpen && (
                <div className={classes.container_input_level}>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="crib"
                      name="crib"
                      value="crèche"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="crib">Crèche</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="kindergarden"
                      name="kindergarden"
                      value="jardin d'enfant"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="kindergarden">Jardin d'enfant</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="preschool"
                      name="preschool"
                      value="maternelle"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="preschool">Maternelle</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="elementary"
                      name="elementary"
                      value="primaire"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="elementary">Primaire</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="middleSchool"
                      name="middleSchool"
                      value="collège"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="middleSchool">Collège</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="highSchool"
                      name="highSchool"
                      value="lycée"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="high school">Lycée</label>
                  </div>
                </div>
              )}

              {/* SECTION SUP */}
              {supIsOpen && (
                <div className={classes.container_input_level}>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="superior"
                      name="superior"
                      value="supérieur"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="preschool">Supérieur</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="special"
                      name="special"
                      value="école spécialisée"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="elementary">école spécialisée</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="university"
                      name="university"
                      value="université"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="university">Université</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="faculty"
                      name="faculty"
                      value="fac"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="high school">fac</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="engineer"
                      name="engineer"
                      value="école d'ingénieur"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="high school">école d'ingénieur</label>
                  </div>

                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="formationCenter"
                      name="formationCenter"
                      value="centre de formation"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="high school">centre de formation</label>
                  </div>

                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="cfa"
                      name="cfa"
                      value="CFA"
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="high school">CFA</label>
                  </div>
                </div>
              )}
            </div>

            <div className={classes.container_filter_group}>
              <h3>Sector</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="public"
                  name="public"
                  value="public"
                  onChange={handleFilterChange}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="private"
                  name="private"
                  value="privé"
                  onChange={handleFilterChange}
                />
                <label htmlFor="private">Private</label>
              </div>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Internat</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="public"
                  name="public"
                  value="public"
                  onChange={handleFilterChange}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="private"
                  name="private"
                  value="privé"
                  onChange={handleFilterChange}
                />
                <label htmlFor="private">Private</label>
              </div>
            </div>

            <Button big>
              Apply filters
            </Button>
          </form>
          <div className={classes.container_result_paginate}>
            <div className={classes.container_card}>
              {results?.results.schools.map((result) => (
                <Link
                  to={`/school/${result._id}`}
                  key={result._id}
                  className={classes.card_link}
                >
                  <div className={classes.card_item}>
                    <div className={classes.container_img}>
                      {result.imgPath1 ? (
                        <img
                          src={result.imgPath1}
                          alt={
                            result.nameUpdate ? result.nameUpdate : result.name
                          }
                        />
                      ) : (
                        <img src={schoolIcon} alt="ecole" />
                      )}
                    </div>
                    <div className={classes.container_infos}>
                      <h6 className={classes.name}>
                        {result.nameUpdate ? result.nameUpdate : result.name}
                      </h6>
                      <div
                        className={classes.cardSugest__container_country_city}
                      >
                        <h6 className={classes.cardCountry}>
                          {result.country},
                        </h6>
                        <h6 className={classes.cardCity}>{result.city}</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={classes.container_paginate}>
              <button onClick={() => handlePageChange("left")}>
                <ArrowBackIos sx={{ fontSize: "15px" }} />
                {!isMobile && "précédent"}
              </button>
              <button>
                {!isMobile && "PAGE"}{" "}
                <span className={classes.currentPage}>{currentPage}</span> /{" "}
                {totalPages}
              </button>
              <button onClick={() => handlePageChange("right")}>
                {!isMobile && "suivant"}
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
