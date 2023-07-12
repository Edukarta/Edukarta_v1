import React, { useState, useEffect, useRef } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPagination } from "../../shared/state/store";
import noFound from "../../img/no_found.png";
import Tooltip from "@mui/material/Tooltip";
import { Grow, Collapse, CircularProgress } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { setSearchResults } from "../../shared/state/store";
import FilterDrawer from "../../shared/components/UIElements/FilterDrawer";
import {
  ArrowBackIos,
  ArrowForwardIos,
  KeyboardArrowUp,
  KeyboardArrowDown,
  SentimentVeryDissatisfied,
} from "@mui/icons-material/";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { Link } from "react-router-dom";
import schoolIcon from "../../img/img_school.jpg";
import classes from "./ResultsPage.module.css";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const previousQuery = useSelector((state) => state.searchQuery);
  const results = useSelector((state) => state.searchResults);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [scoIsOpen, setScoIsOpen] = useState(false);
  const [supIsOpen, setSupIsOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [supCheckboxes, setSupCheckboxes] = useState({
    all: false,
    university: false,
    special: false,
    engineer: false,
    buissnessSchool: false,
    formationCenter: false,
  });
  const [scoCheckboxes, setScoCheckboxes] = useState({
    allSco: false,
    crib: false,
    kindergarden: false,
    preschool: false,
    elementary: false,
    middleSchool: false,
    highSchool: false,
  });
  const [formattedFilters, setFormattedFilters] = useState([]);
  const { currentPage, totalPages, totalCount, pageSize } = useSelector(
    (state) => state.pagination
  );
  const limit = useSelector((state) => state.pagination.pageSize);
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
    setFormattedFilters([]);
  }, [previousQuery]);

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
      if (currentPageValue < totalPages) {
        const newPage = currentPageValue + 1;
        dispatch(setPagination({ currentPage: newPage, totalPages }));
      }
    }
  };

  const handleFilterSupChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    const supCheckboxValues = [
      "université",
      "école spécialisée",
      "école d'ingénieur",
      "école de commerce",
      "centre de formation",
    ];

    if (name === "all") {
      setSupCheckboxes({
        all: checked,
        university: checked,
        special: checked,
        engineer: checked,
        buissnessSchool: checked,
        formationCenter: checked,
      });

      if (checked) {
        setSelectedFilters(supCheckboxValues);
      } else {
        setSelectedFilters([]);
      }
    } else {
      setSupCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [name]: checked,
        all: false,
      }));

      if (checked) {
        setSelectedFilters([...selectedFilters, e.target.value]);
      } else {
        setSelectedFilters(
          selectedFilters.filter((filter) => filter !== e.target.value)
        );
      }
    }
  };

  const handleFilterScoChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    const scoCheckboxValues = [
      "crèche",
      "jardin d'enfant",
      "maternelle",
      "primaire",
      "collège",
      "lycée",
    ];

    if (name === "allSco") {
      setScoCheckboxes({
        allSco: checked,
        crib: checked,
        kindergarden: checked,
        preschool: checked,
        elementary: checked,
        middleSchool: checked,
        highSchool: checked,
      });

      if (checked) {
        setSelectedFilters(scoCheckboxValues);
      } else {
        setSelectedFilters([]);
      }
    } else {
      setScoCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [name]: checked,
        allSco: false,
      }));

      if (checked) {
        setSelectedFilters([...selectedFilters, e.target.value]);
      } else {
        setSelectedFilters(
          selectedFilters.filter((filter) => filter !== e.target.value)
        );
      }
    }
  };

  const handleSearch = async (event = null, newCurrentPage = null) => {
    if (event) {
      event.preventDefault();
    }
    setProgress(true);
    const query = selectedFilters.join(",");
    console.log(query);
    setFormattedFilters(query);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/schools/filter?previousQuery=${previousQuery}&query=${query}&page=${currentPage}&perPage=${limit}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(currentPage);
      dispatch(setSearchResults({ results: data }));
      dispatch(
        setPagination({
          currentPage: currentPage,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
        })
      );
    } catch (error) {
      console.error(error);
    }
    setCityFilter("");
    setCountryFilter("");
    setDrawerIsOpen(false);
    setProgress(false);
  };

  useEffect(() => {
    if (currentPageRef.current !== currentPage) {
      currentPageRef.current = currentPage;
      if (selectedFilters.length > 0) {
        handleSearch();
      }
    }
  }, [currentPage, handleSearch]);

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
              <h3>Filtrer ma recherche</h3>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Niveaux</h3>
              <div className={classes.btn_sco_sup}>
                <div
                  className={classes.cat_sco}
                  onClick={() => {
                    setScoIsOpen((prev) => !prev);
                    setSupIsOpen(false);
                  }}
                >
                  <div className={classes.arrow_icon}>
                    {!scoIsOpen ? (
                      <KeyboardArrowDown
                        sx={{ color: "#C0C0C0", fontSize: "25px" }}
                      />
                    ) : (
                      <KeyboardArrowUp
                        sx={{ color: "#C0C0C0", fontSize: "25px" }}
                      />
                    )}
                  </div>
                  <span>Sco</span>
                </div>
                <div
                  className={classes.cat_sup}
                  onClick={() => {
                    setSupIsOpen((prev) => !prev);
                    setScoIsOpen(false);
                  }}
                >
                  <div className={classes.arrow_icon}>
                    {!supIsOpen ? (
                      <KeyboardArrowDown
                        sx={{ color: "#C0C0C0", fontSize: "25px" }}
                      />
                    ) : (
                      <KeyboardArrowUp
                        sx={{ color: "#C0C0C0", fontSize: "25px" }}
                      />
                    )}
                  </div>
                  <span>Sup</span>
                </div>
              </div>
              {/* SECTION SCO / MOBILE */}
              <Collapse in={scoIsOpen} collapsedSize={0}>
                <div className={classes.container_input_level}>
                <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="allSco"
                        name="allSco"
                        value="allSco"
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="allSco">Tout Cocher</label>
                    </div>
                  {/* <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="crib"
                      name="crib"
                      value="crèche"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="crib">Crèche</label>
                  </div> */}
                  {/* <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="kindergarden"
                      name="kindergarden"
                      value="jardin d'enfant"
                      onChange={handleFilterScoChange}
                    />
                    <label htmlFor="kindergarden">Jardin d'enfant</label>
                  </div> */}
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="preschool"
                      name="preschool"
                      value="maternelle"
                      onChange={handleFilterScoChange}
                    />
                    <label htmlFor="preschool">Maternelle</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="elementary"
                      name="elementary"
                      value="primaire"
                      onChange={handleFilterScoChange}
                    />
                    <label htmlFor="elementary">Primaire</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="middleSchool"
                      name="middleSchool"
                      value="collège"
                      onChange={handleFilterScoChange}
                    />
                    <label htmlFor="middleSchool">Collège</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="highSchool"
                      name="highSchool"
                      value="lycée"
                      onChange={handleFilterScoChange}
                    />
                    <label htmlFor="highschool">Lycée</label>
                  </div>
                </div>
              </Collapse>

              {/* SECTION SUP / MOBILE */}
              <Collapse in={supIsOpen} collapsedSize={0}>
                <div className={classes.container_input_level}>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="all"
                      name="all"
                      value="all"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="all">Tout Cocher</label>
                  </div>

                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="university"
                      name="university"
                      value="université"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="university">Université</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="special"
                      name="special"
                      value="école spécialisée"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="special">école spécialisée</label>
                  </div>
                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="engineer"
                      name="engineer"
                      value="école d'ingénieur"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="engineer">école d'ingénieur</label>
                  </div>

                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="buissnessSchool"
                      name="buissnessSchool"
                      value="école de commerce"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="buissnessSchool">école de commerce</label>
                  </div>

                  <div className={classes.input_filter_goup}>
                    <input
                      type="checkbox"
                      id="formationCenter"
                      name="formationCenter"
                      value="centre de formation"
                      onChange={handleFilterSupChange}
                    />
                    <label htmlFor="formationCenter">
                      centre de formation Pro
                    </label>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Secteur</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="public"
                  name="public"
                  value="public"
                  onChange={handleFilterSupChange}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="private"
                  name="private"
                  value="privé"
                  onChange={handleFilterSupChange}
                />
                <label htmlFor="private">Privé</label>
              </div>
            </div>

            <div className={classes.container_filter_group}>
              <h3>Internat</h3>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="yes"
                  name="yes"
                  value="oui"
                  onChange={handleFilterSupChange}
                />
                <label htmlFor="yes">Oui</label>
              </div>
              <div className={classes.input_filter_goup}>
                <input
                  type="checkbox"
                  id="no"
                  name="no"
                  value="non"
                  onChange={handleFilterSupChange}
                />
                <label htmlFor="no">Non</label>
              </div>
            </div>

            <div className={classes.container_btn_filter}>
              <Button big gradient>
                Valider
              </Button>
            </div>
          </form>
        </FilterDrawer>

        {results.results.schools.length < 1 && (
          <div className={classes.container_noresult}>
            <img src={noFound} alt="recherche non trouvée" />
            <h3>Aucun résultat trouvé</h3>
            <p>
              Nous n'avons pas trouvé de resultat pour {`"${previousQuery}"`}.
            </p>
            <p>Veuillez réessayer.</p>
          </div>
        )}

        {results.results.schools.length !== 0 && (
          <div className={classes.results_number}>
            <h5 className={classes.number_of_results}>
              {previousQuery}{" "}
              {formattedFilters && formattedFilters !== ""
                ? `${formattedFilters}`
                : null}
              {": "} <span>{totalCount}</span>{" "}
              {totalCount > 1
                ? "établissements trouvés"
                : "établissement trouvé"}
            </h5>
            <h6>{`Page ${currentPage}`}</h6>
          </div>
        )}
        <div className={classes.container_results}>
          {results.results.schools.length !== 0 && (
            <form className={classes.container_filter} onSubmit={handleSearch}>
              <div className={classes.container_title_filter_panel}>
                <h3>Filtrer ma recherche</h3>
              </div>
              <div className={classes.container_filter_group}>
                <h3>Niveaux</h3>
                <div className={classes.btn_sco_sup}>
                  <div
                    className={classes.cat_sco}
                    onClick={() => {
                      setScoIsOpen((prev) => !prev);
                      setSupIsOpen(false);
                    }}
                  >
                    <div className={classes.arrow_icon}>
                      {!scoIsOpen ? (
                        <KeyboardArrowDown
                          sx={{ color: "#C0C0C0", fontSize: "25px" }}
                        />
                      ) : (
                        <KeyboardArrowUp
                          sx={{ color: "#C0C0C0", fontSize: "25px" }}
                        />
                      )}
                    </div>
                    <span>Sco</span>
                  </div>
                  <div
                    className={classes.cat_sup}
                    onClick={() => {
                      setSupIsOpen((prev) => !prev);
                      setScoIsOpen(false);
                    }}
                  >
                    <div className={classes.arrow_icon}>
                      {!supIsOpen ? (
                        <KeyboardArrowDown
                          sx={{ color: "#C0C0C0", fontSize: "25px" }}
                        />
                      ) : (
                        <KeyboardArrowUp
                          sx={{ color: "#C0C0C0", fontSize: "25px" }}
                        />
                      )}
                    </div>
                    <span>Sup</span>
                  </div>
                </div>
                {/* SECTION SCO / DESKTOP */}
                <Collapse in={scoIsOpen} collapsedSize={0}>
                  <div className={classes.container_input_level}>
                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="allSco"
                        name="allSco"
                        value="allSco"
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="allSco">Tout Cocher</label>
                    </div>

                    {/* <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="crib"
                        name="crib"
                        value="crèche"
                        checked={scoCheckboxes.crib}
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="crib">Crèche</label>
                    </div> */}

                    {/* <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="kindergarden"
                        name="kindergarden"
                        value="jardin d'enfant"
                        checked={scoCheckboxes.kindergarden}
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="kindergarden">Jardin d'enfant</label>
                    </div> */}

                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="preschool"
                        name="preschool"
                        value="maternelle"
                        checked={scoCheckboxes.preschool}
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="preschool">Maternelle</label>
                    </div>
                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="elementary"
                        name="elementary"
                        value="primaire"
                        checked={scoCheckboxes.elementary}
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="elementary">Primaire</label>
                    </div>
                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="middleSchool"
                        name="middleSchool"
                        value="collège"
                        checked={scoCheckboxes.middleSchool}
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="middleSchool">Collège</label>
                    </div>
                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="highSchool"
                        name="highSchool"
                        value="lycée"
                        checked={scoCheckboxes.highSchool}
                        onChange={handleFilterScoChange}
                      />
                      <label htmlFor="highschool">Lycée</label>
                    </div>
                  </div>
                </Collapse>

                {/* SECTION SUP / DESKTOP */}
                <Collapse in={supIsOpen} collapsedSize={0}>
                  <div className={classes.container_input_level}>
                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="all"
                        name="all"
                        value="all"
                        onChange={handleFilterSupChange}
                      />
                      <label htmlFor="all">Tout Cocher</label>
                    </div>

                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="university"
                        name="university"
                        value="université"
                        checked={supCheckboxes.university}
                        onChange={handleFilterSupChange}
                      />
                      <label htmlFor="university">Université</label>
                    </div>

                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="special"
                        name="special"
                        value="école spécialisée"
                        checked={supCheckboxes.special}
                        onChange={handleFilterSupChange}
                      />
                      <label htmlFor="special">école spécialisée</label>
                    </div>

                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="engineer"
                        name="engineer"
                        value="école d'ingénieur"
                        checked={supCheckboxes.engineer}
                        onChange={handleFilterSupChange}
                      />
                      <label htmlFor="engineer">école d'ingénieur</label>
                    </div>

                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="buissnessSchool"
                        name="buissnessSchool"
                        value="école de commerce"
                        checked={supCheckboxes.buissnessSchool}
                        onChange={handleFilterSupChange}
                      />
                      <label htmlFor="buissnessSchool">école de commerce</label>
                    </div>

                    <div className={classes.input_filter_goup}>
                      <input
                        type="checkbox"
                        id="formationCenter"
                        name="formationCenter"
                        value="centre de formation"
                        checked={supCheckboxes.formationCenter}
                        onChange={handleFilterSupChange}
                      />
                      <label htmlFor="formationCenter">
                        centre de formation Pro
                      </label>
                    </div>
                  </div>
                </Collapse>
              </div>

              <div className={classes.container_filter_group}>
                <h3>Secteur</h3>
                <div className={classes.input_filter_goup}>
                  <input
                    type="checkbox"
                    id="public"
                    name="public"
                    value="public"
                    onChange={handleFilterSupChange}
                  />
                  <label htmlFor="public">Public</label>
                </div>
                <div className={classes.input_filter_goup}>
                  <input
                    type="checkbox"
                    id="private"
                    name="private"
                    value="privé"
                    onChange={handleFilterSupChange}
                  />
                  <label htmlFor="private">Privé</label>
                </div>
              </div>

              <div className={classes.container_filter_group}>
                <h3>Internat</h3>
                <div className={classes.input_filter_goup}>
                  <input
                    type="checkbox"
                    id="yes"
                    name="yes"
                    value="oui"
                    onChange={handleFilterSupChange}
                  />
                  <label htmlFor="yes">Oui</label>
                </div>
                <div className={classes.input_filter_goup}>
                  <input
                    type="checkbox"
                    id="no"
                    name="no"
                    value="non"
                    onChange={handleFilterSupChange}
                  />
                  <label htmlFor="private">Non</label>
                </div>
              </div>
              {!progress ? (
                <Button big gradient>
                  Valider
                </Button>
              ) : (
                <div className={classes.progress}>
                  <CircularProgress />
                </div>
              )}
            </form>
          )}
          <div className={classes.container_result_paginate}>
            <div className={classes.container_card}>
              {results?.results.schools.map((result, index) => (
                <Grow in={true} key={result._id} timeout={(index + 1) * 350}>
                  <Link
                    to={`/school/${result._id}`}
                    className={classes.card_link}
                  >
                    <div className={classes.card_item}>
                      <div className={classes.container_img}>
                        {result.imgPath1 ? (
                          <img
                            src={result.imgPath1}
                            alt={
                              result.nameUpdate
                                ? result.nameUpdate
                                : result.name
                            }
                          />
                        ) : (
                          <img src={schoolIcon} alt="ecole" />
                        )}
                      </div>
                      <div className={classes.container_infos}>
                        <Tooltip
                          title={
                            result.nameUpdate ? result.nameUpdate : result.name
                          }
                          enterTouchDelay={0}
                        >
                          <h6 className={classes.name}>
                            {result.nameUpdate
                              ? result.nameUpdate
                              : result.name}
                          </h6>
                        </Tooltip>
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
                </Grow>
              ))}
            </div>
            {results.results.schools.length !== 0 && (
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
