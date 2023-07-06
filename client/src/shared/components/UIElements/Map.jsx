import React, { useState, useEffect, useRef } from "react";
import Button from "../FormElements/Button";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import schoolIcon from "../../../img/img_school.jpg";
import { Link } from "react-router-dom";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../../utils/apiUtils";
import { setSchool } from "../../state/store";
import { LocationOn, School, Flag, MenuBook } from "@mui/icons-material";
import markerSup from "../../../img/point_sup.png";
import markerSco from "../../../img/point_sco.png";
import MapCardDrawer from "./MapCardDrawer";
import { useMediaQuery } from "@mui/material";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";

const Map = ({ type, schools }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [schoolsMap, setSchoolsMap] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const isSmallerScreen = useMediaQuery("(max-width:1080px)");
  const zoom = isSmallerScreen ? 2 : 6;
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const schoolDrawer = useSelector((state) => state.school);
  const lastPositionRef = useRef(null);

  let levels = "";
  if (schoolDrawer) {
    levels = schoolDrawer.level.join(" - ");
  }
  const disableClusteringAtZoom = 8;

  const MarkerSup = new Icon({
    iconUrl: markerSup,
    iconSize: [20, 20],
    iconAnchor: [5, 5],
    className: "custom-marker-icon",
  });

  const MarkerSco = new Icon({
    iconUrl: markerSco,
    iconSize: [20, 20],
    iconAnchor: [5, 5],
    className: "custom-marker-icon",
  });

  const cretaedCustomClusterIcon = (cluster) => {
    let clusterColor = classes.blue;
    const childCount = cluster.getChildCount();
    if (childCount >= 20 && childCount <= 50) {
      clusterColor = classes.orange;
    } else if (childCount >= 50) {
      clusterColor = classes.red;
    }

    return new divIcon({
      html: `<div class="${classes.cluster_icon} ${clusterColor}"></div>`,
      className: "custom-marker-cluster",
      iconSize: point(20, 20, true),
    });
  };

  const fetchSchoolsMap = async () => {
    const center = mapRef.current.getCenter();
    const bounds = mapRef.current.getBounds();
    const mapSize = mapRef.current.getSize();

    const offset = 0.5; // Ajustez la valeur de l'offset selon votre besoin

    const latDiff = bounds.getNorth() - bounds.getSouth();
    const lngDiff = bounds.getEast() - bounds.getWest();

    const ne = {
      lat: center.lat + offset * latDiff,
      lng: center.lng + offset * lngDiff,
    };

    const sw = {
      lat: center.lat - offset * latDiff,
      lng: center.lng - offset * lngDiff,
    };

    const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/schools/map?neLat=${ne.lat}&neLng=${ne.lng}&swLat=${sw.lat}&swLng=${sw.lng}&page=${page}&limit=${limit}&zoom=${currentZoom}`;
    try {
      const responseData = callApi(apiUrl);
      const data = await responseData;
      const allSchools = await data.data;
      let filteredSchools = allSchools.schools;
      if (selectedType === "sco") {
        filteredSchools = allSchools.schools.filter(
          (school) => school.category === "SCO"
        );
      } else if (selectedType === "sup") {
        filteredSchools = allSchools.schools.filter(
          (school) => school.category === "SUP"
        );
      } else {
        // Cas par défaut, toutes les écoles sont affichées
      }
      setSchoolsMap(filteredSchools);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateLimit = (zoom) => {
    if (zoom <= 5) {
      return 50;
    } else if (zoom <= 8) {
      return 100;
    } else {
      return 700;
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      fetchSchoolsMap();
    }
  }, [mapRef.current, limit]);

  useEffect(() => {
    fetchSchoolsMap();
  }, [selectedType]);

  const handleMoveEnd = () => {
    const currentPosition = mapRef.current.getCenter();
    const zoom = mapRef.current.getZoom();
    const newLimit = calculateLimit(zoom);
    setLimit(newLimit);

    if (lastPositionRef.current) {
      const lastPosition = lastPositionRef.current;
      const distanceThreshold = 200;

      const distance = lastPosition.distanceTo(currentPosition);

      if (distance >= distanceThreshold) {
        fetchSchoolsMap();
        lastPositionRef.current = currentPosition;
      }
    } else {
      lastPositionRef.current = currentPosition;
    }
  };

  const MapEventHandler = () => {
    const map = useMap();

    useEffect(() => {
      mapRef.current = map;
      map.on("moveend", handleMoveEnd);
      map.on("zoomend", handleMoveEnd); // Ajouter cette ligne

      return () => {
        map.off("moveend", handleMoveEnd);
        map.off("zoomend", handleMoveEnd); // Ajouter cette ligne
      };
    }, []);

    return null;
  };

  return (
    <>
      <div className={classes.container_map_btn}>
        <div className={classes.container_legend}>
          <div className={classes.bloc_legend}>
            <img src={markerSco} alt="scolaire" />
            <span>Scolaire</span>
          </div>
          <div className={classes.bloc_legend}>
            <img src={markerSup} alt="superieur" />
            <span>Supérieur</span>
          </div>
        </div>
        <div className={classes.container_form_control}>
          <div className={classes.form_control}>
            <input
              type="radio"
              id="all"
              name="type"
              value="all"
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <label htmlFor="all" className={classes.map_label}>
              Tout
            </label>
          </div>
          <div className={classes.form_control}>
            <input
              type="radio"
              id="sco"
              name="type"
              value="sco"
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <label htmlFor="sco" className={classes.map_label}>
              Scolaire
            </label>
          </div>
          <div className={classes.form_control}>
            <input
              type="radio"
              id="sup"
              name="type"
              value="sup"
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <label htmlFor="sup" className={classes.map_label}>
              Supérieur
            </label>
          </div>
        </div>
      </div>
      <MapContainer
        center={[46.232192999999995, 2.209666999999996]}
        ref={mapRef}
        zoom={zoom}
        onZoomend={(e) => setCurrentZoom(e.target.getZoom())}
        minZoom={4}
        bounceAtZoomLimits={false}
        scrollWheelZoom={0.2}
        className={
          type === "homepage" ? classes.mapContainer : classes.mapContainer_map
        }
      >
        <TileLayer url="https://maptiles.p.rapidapi.com/fr/map/v1/{z}/{x}/{y}.png?rapidapi-key=6d0707b6b6msh5953627b7c9ebb1p172529jsn057f475ae858" />
        <MapEventHandler />
        {/* <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={cretaedCustomClusterIcon}
          disableClusteringAtZoom={disableClusteringAtZoom}
        > */}
        {schoolsMap.map((school, index) => {
          if (school.gps[0] && school.gps[1]) {
            return (
              <Marker
                position={school.gps}
                icon={school.category === "SCO" ? MarkerSco : MarkerSup}
                id={school.id}
                key={index}
                eventHandlers={{
                  click: () => {
                    dispatch(setSchool({ school }));
                    setDrawerIsOpen(true);
                  },
                }}
              >
                <Link to={`/school/${school._id}`}>
                  <Popup>
                    {type !== "homepage" ? (
                      <div className={classes.container_Popup}>
                        <div className={classes.container_Popup_img}>
                          {school.imgPath1 ? (
                            <img
                              src={school.imgPath1}
                              alt={
                                school.nameUpdate
                                  ? school.nameUpdate
                                  : school.name
                              }
                            />
                          ) : (
                            <img
                              src={schoolIcon}
                              alt={
                                school.nameUpdate
                                  ? school.nameUpdate
                                  : school.name
                              }
                            />
                          )}
                        </div>
                        <div className={classes.container_infos}>
                          <h1 className={classes.popup_schoolName}>
                            {school.name}
                          </h1>
                          <div className={classes.container_infos_item}>
                            <LocationOn sx={{ color: "#324964" }} />
                            <p className={classes.container_infos_address}>
                              {school.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h5 className={classes.popup_schoolNameSmall}>
                          {school.name}
                        </h5>
                        <p className={classes.popup_schoolAddressSmall}>
                          {school.address}
                        </p>
                      </div>
                    )}
                  </Popup>
                </Link>
              </Marker>
            );
          }
          return null;
        })}
        {/* </MarkerClusterGroup> */}
        <MapCardDrawer show={drawerIsOpen}>
          {schoolDrawer && (
            <div className={classes.container_infos_drawer}>
              <div className={classes.container_img_drawer}>
                {schoolDrawer.imgPath1 ? (
                  <img src={schoolDrawer.imgPath1} alt="" />
                ) : (
                  <img src={schoolIcon} alt="" />
                )}
                <button
                  className={classes.drawer_close_btn}
                  onClick={() => setDrawerIsOpen(false)}
                >
                  X
                </button>
              </div>
              <div className={classes.container_infos}>
                <Link to={`/school/${schoolDrawer._id}`}>
                  <h3 className={classes.school_drawer_name}>
                    {schoolDrawer.nameUpdate
                      ? schoolDrawer.nameUpdate
                      : schoolDrawer.name}
                  </h3>
                </Link>
                <div className={classes.school_drawer_infos_items}>
                  <div className={classes.school_drawer_info}>
                    <LocationOn sx={{ color: "#4285F4" }} />
                    <h5>{schoolDrawer.address}</h5>
                  </div>
                  <div className={classes.school_drawer_info}>
                    <Flag sx={{ color: "#4285F4" }} />
                    <h5>{schoolDrawer.country}</h5>
                  </div>
                  <div className={classes.school_drawer_info}>
                    <School sx={{ color: "#4285F4" }} />
                    <h5>{levels}</h5>
                  </div>
                  <div className={classes.school_drawer_info}>
                    <MenuBook sx={{ color: "#0275d8" }} />
                    <h5>{schoolDrawer.sector}</h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        </MapCardDrawer>
        ;
      </MapContainer>
    </>
  );
};

export default Map;
