import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useSelector, useDispatch } from "react-redux";
import { setSearchResults, setSearchQuery } from "../../shared/state/store";
import FilterDrawer from "../../shared/components/UIElements/FilterDrawer";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material/";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { Link } from "react-router-dom";
import schoolIcon from "../../img/img_school.jpg";
import classes from "./ResultsPage.module.css";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const results = useSelector((state) => state.searchResults);
  const previousQuery = useSelector((state) => state.searchQuery);

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
        `https://www.edukarta.com/api/v1/schools/filter?previousQuery=${previousQuery}&query=${query}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setSearchResults({ results: data }));
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
    setDrawerIsOpen(false);
  };

  console.log(previousQuery);
  console.log(selectedFilters);
  console.log(results);

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
            {previousQuery} {": "}{" "}
            <span>{results?.results.schools.length}</span>{" "}
            {results?.results.schools.length > 1
              ? "schools found"
              : "school found"}
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
                    <h6 className={classes.country}>
                      {result.countryUpdate
                        ? result.countryUpdate
                        : result.country}
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
