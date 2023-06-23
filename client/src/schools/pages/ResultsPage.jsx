import React, { useState, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPagination } from "../../shared/state/store";
import { useMediaQuery } from "@mui/material";
import {
  setSearchResults,
  setSearchQuery,
  setQuery,
} from "../../shared/state/store";
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
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const query = useSelector((state) => state.searchQuery);
  const results = useSelector((state) => state.searchResults);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState([]);
  const [currentQuery, setCurrentQuery] = useState(query.trim() || "");
  const { currentPage, totalPages, totalCount, limit } = useSelector(
    (state) => state.pagination
  );
  const filters = useSelector((state) => state.filters);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(
      setPagination({
        currentPage: 1,
        totalCount: totalCount,
        totalPages: totalPages,
      })
    );
  
  }, [query]);

  const handlePageChange = (direction) => {
    if (direction === "left") {
      const currentPageValue = currentPage || 1; // Utilise 1 si currentPage est null
      if (currentPageValue > 1) {
        const newPage = currentPageValue - 1;
        dispatch(setQuery(query));
        dispatch(setPagination({ currentPage: newPage, totalPages }));
      }
    }

    if (direction === "right") {
      const currentPageValue = currentPage || 1; // Utilise 0 si currentPage est null
      const newPage = currentPageValue + 1;
      dispatch(setQuery(query));
      dispatch(setPagination({ currentPage: newPage, totalPages }));
    }
  };

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    if (name === "city") {
      setCityFilter(value);
    } else {
      if (checked) {
        setSearchQuery((prevQuery) => [...prevQuery, value]);
      } else {
        setSearchQuery((prevQuery) =>
          prevQuery.filter((filter) => filter !== value)
        );
      }
    }
  };

  console.log(cityFilter)

  const handleSearch = async (e) => {
    e.preventDefault();
    const mergedQuery = [...searchQuery.map((word) => word.toLowerCase())];
    if (!mergedQuery.includes(currentQuery.toLowerCase())) {
      mergedQuery.unshift(currentQuery.toLowerCase());
    }
    if (cityFilter) {
      mergedQuery.unshift(cityFilter.toLowerCase());
    }
    
    const queryString = mergedQuery.join(" ").replace(/\s+/g, " ");
    console.log("queryString " + queryString);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/search?query=${queryString}&page=${currentPage}&perPage=${limit}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setSearchResults({ results: data }));
      dispatch(
        setPagination({
          currentPage,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
        })
      );
      dispatch(setQuery(queryString));
    } catch (error) {
      console.error(error);
    }
    setDrawerIsOpen(false);
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
            {query} {": "} <span>{totalCount}</span>{" "}
            {totalCount > 1 ? "schools found" : "school found"}
          </h5>
        </div>
        <div className={classes.container_results}>
          <form className={classes.container_filter} onSubmit={handleSearch}>
            <div className={classes.container_title_filter_panel}>
              <h3>Filter by :</h3>
            </div>

            {filters.includes("country") && filters.includes("city") && (
              <div className={classes.container_filter_group}>
                <h3>Pays</h3>
                <div className={classes.input_filter_goup}>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={cityFilter}
                    placeholder="Search by city"
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            )}

            {filters.includes("city") && (
              <div className={classes.container_filter_group}>
                <h3>Ville</h3>
                <div className={classes.input_filter_goup}>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={cityFilter}
                    placeholder="Search by city"
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            )}

            {filters.includes("level") && (
              <div className={classes.container_filter_group}>
                <h3>Niveau</h3>
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
                  <label htmlFor="high school">High School</label>
                </div>
                <div className={classes.input_filter_goup}>
                  <input
                    type="checkbox"
                    id="university"
                    name="university"
                    value="université"
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="university">University</label>
                </div>
              </div>
            )}

            {filters.includes("sector") && (
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
                    value="private"
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="private">Private</label>
                </div>
              </div>
            )}

            <Button big>Apply filters</Button>
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
