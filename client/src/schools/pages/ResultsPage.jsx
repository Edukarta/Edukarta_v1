import React, { useState, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPagination } from "../../shared/state/store";
import { setSearchResults, setSearchQuery, setQuery } from "../../shared/state/store";
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
import { callApi } from "../../utils/apiUtils";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const results = useSelector((state) => state.searchResults);
  const previousQuery = useSelector((state) => state.searchQuery);
  const { currentPage, totalPages, totalCount } = useSelector(
    (state) => state.pagination
  );
  const [itemsPerPage] = useState(10);

  // const handlePageChange = (pageNumber) => {
  //   if (pageNumber > 0 && pageNumber <= totalPages) {
  //     dispatch(setPagination({ currentPage: pageNumber, totalPages }));
  //   }
  // };


  const handlePageChange = (direction) => {
    if (direction === "left") {
      const currentPageValue = currentPage || 1; // Utilise 1 si currentPage est null
      if (currentPageValue > 1) {
        const newPage = currentPageValue - 1;
        dispatch(setQuery(previousQuery));
        dispatch(setPagination({ currentPage: newPage, totalPages }));
      }
    }

    if (direction === "right") {
      const currentPageValue = currentPage || 1; // Utilise 0 si currentPage est null
      const newPage = currentPageValue + 1;
      dispatch(setQuery(previousQuery));
      dispatch(setPagination({ currentPage: newPage, totalPages }));
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = selectedFilters.join(",");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/filter?previousQuery=${previousQuery}&query=${query}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setSearchResults({ results: data }));
    } catch (error) {
      console.error(error);
    }
    setDrawerIsOpen(false);
  };

  return (
    <>
      <header className={classes.container_navigation}>
        <MainNavigation />
      </header>
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
              <h3>Level</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="preschool"
                  name="preschool"
                  value="preschool"
                  onChange={handleFilterChange}
                />
                <label htmlFor="preschool">Preschool</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="college"
                  name="college"
                  value="college"
                  onChange={handleFilterChange}
                />
                <label htmlFor="college">College</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="university"
                  name="university"
                  value="university"
                  onChange={handleFilterChange}
                />
                <label htmlFor="university">University</label>
              </div>
              <div className={classes.input_filter_goup}>
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

            <div className={classes.container_filter_group}>
              <h3>Language spoken</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="english"
                  name="english"
                  value="english"
                  onChange={handleFilterChange}
                />
                <label htmlFor="english">English</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="chinese"
                  name="chinese"
                  value="chinese"
                  onChange={handleFilterChange}
                />
                <label htmlFor="chinese">Chinese</label>
              </div>
              <div className={classes.input_filter_goup}>
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
            <Button big>Apply filters</Button>
          </form>
          <div className={classes.container_result_pageinate}>
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
              {/* {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                if (currentPage <= 10) {
                  if (index < 10) {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          handlePageChange(pageNumber);
                          dispatch(
                            setPagination({
                              currentPage: pageNumber,
                              totalPages,
                            })
                          );
                        }}
                        className={
                          pageNumber === currentPage
                            ? classes.activePage
                            : classes.page
                        }
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (index === 10 && totalPages > 20) {
                    return (
                      <>
                        <span key="ellipsis">...</span>
                        <button
                          key={index}
                          onClick={() => {
                            handlePageChange(11);
                            dispatch(
                              setPagination({
                                currentPage: 11,
                                totalPages,
                              })
                            );
                          }}
                          className={
                            11 === currentPage
                              ? classes.activePage
                              : classes.page
                          }
                        >
                          11
                        </button>
                      </>
                    );
                  }
                } else {
                  const currentGroupFirstPage =
                    Math.floor((currentPage - 1) / 10) * 10 + 1;
                  const lastPageInCurrentGroup = Math.min(
                    currentGroupFirstPage + 9,
                    totalPages
                  );

                  if (index === currentGroupFirstPage - 2) {
                    return (
                      <>
                        <button
                          key={index}
                          onClick={() => {
                            handlePageChange(currentGroupFirstPage - 1);
                            dispatch(
                              setPagination({
                                currentPage: currentGroupFirstPage - 1,
                                totalPages,
                              })
                            );
                          }}
                          className={
                            currentGroupFirstPage - 1 === currentPage
                              ? classes.activePage
                              : classes.page
                          }
                        >
                          {currentGroupFirstPage - 1}
                        </button>
                        <span key="ellipsis">...</span>
                      </>
                    );
                  } else if (
                    index >= currentGroupFirstPage - 1 &&
                    index <= lastPageInCurrentGroup - 1
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          handlePageChange(pageNumber);
                          dispatch(
                            setPagination({
                              currentPage: pageNumber,
                              totalPages,
                            })
                          );
                        }}
                        className={
                          pageNumber === currentPage
                            ? classes.activePage
                            : classes.page
                        }
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (index === lastPageInCurrentGroup) {
                    return (
                      <>
                        <span key="ellipsis">...</span>
                        <button
                          key={index}
                          onClick={() => {
                            handlePageChange(lastPageInCurrentGroup + 1);
                            dispatch(
                              setPagination({
                                currentPage: lastPageInCurrentGroup + 1,
                                totalPages,
                              })
                            );
                          }}
                          className={
                            lastPageInCurrentGroup + 1 === currentPage
                              ? classes.activePage
                              : classes.page
                          }
                        >
                          {lastPageInCurrentGroup + 1}
                        </button>
                      </>
                    );
                  }
                }

                return null;
              })} */}
              <button onClick={() => handlePageChange("left")}>
                <ArrowBackIos sx={{fontSize: "15px"}} />
                précédent
              </button>
              <button>
                PAGE <span className={classes.currentPage}>{currentPage}</span>{" "}
                / {totalPages}
              </button>
              <button onClick={() => handlePageChange("right")}>
                suivant
                <ArrowForwardIos sx={{fontSize: "15px"}} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
