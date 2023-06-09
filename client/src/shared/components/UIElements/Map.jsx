import React, { useState, useEffect, useRef } from "react";
import Button from "../FormElements/Button";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
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
import MapCardDrawerBottom from "./MapCardDrawerBottom";
import { useMediaQuery, Tooltip } from "@mui/material";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";

const Map = ({ type }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [drawerBottomIsOpen, setDrawerBottomIsOpen] = useState(false);
  const [schoolsMap, setSchoolsMap] = useState([]);
  const [selectedType, setSelectedType] = useState("both");
  const isSmallerScreen = useMediaQuery("(max-width:1080px)");
  const zoom = isSmallerScreen ? 2 : 6;
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const schoolDrawer = useSelector((state) => state.school);
  const lastPositionRef = useRef(null);

  const levels = schoolDrawer && schoolDrawer.level && schoolDrawer.level.length > 0
  ? schoolDrawer.level.join(" - ")
  : "";
  const MarkerSup = new Icon({
    iconUrl: markerSco,
    iconSize: [20, 20],
    iconAnchor: [5, 5],
    className: "custom-marker-icon",
  });

  const MarkerSco = new Icon({
    iconUrl: markerSup,
    iconSize: [20, 20],
    iconAnchor: [5, 5],
    className: "custom-marker-icon",
  });

  // const cretaedCustomClusterIcon = (cluster) => {
  //   let clusterColor = classes.blue;
  //   const childCount = cluster.getChildCount();
  //   if (childCount >= 20 && childCount <= 50) {
  //     clusterColor = classes.orange;
  //   } else if (childCount >= 50) {
  //     clusterColor = classes.red;
  //   }

  //   return new divIcon({
  //     html: `<div class="${classes.cluster_icon} ${clusterColor}"></div>`,
  //     className: "custom-marker-cluster",
  //     iconSize: point(20, 20, true),
  //   });
  // };

  const fetchSchoolsMap = async () => {
    const center = mapRef.current.getCenter();
    const bounds = mapRef.current.getBounds();

    const offset = 0.5;

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
      if (selectedType.includes("sco")) {
        filteredSchools = filteredSchools.filter(
          (school) => school.category === "SCO"
        );
      }
      if (selectedType.includes("sup")) {
        filteredSchools = filteredSchools.filter(
          (school) => school.category === "SUP"
        );
      }

      if (selectedType === "") {
        filteredSchools = [];
      }

      setSchoolsMap(filteredSchools);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateLimit = (zoom) => {
    if (zoom <= 5) {
      return 30;
    } else if (zoom <= 8) {
      return 60;
    } else {
      return 200;
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
      map.on("zoomend", handleMoveEnd);

      return () => {
        map.off("moveend", handleMoveEnd);
        map.off("zoomend", handleMoveEnd);
      };
    }, []);

    return null;
  };
  console.log(selectedType);
  return (
    <>
      <div
        className={
          type === "homepage"
            ? classes.container_map_btn
            : classes.container_map_btn_bottom
        }
      >
        <div className={classes.container_form_control}>
          <div className={classes.form_control}>
            <input
              type="checkbox"
              id="sco"
              name="type"
              value="sco"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedType((prevType) => {
                    if (prevType.includes("sup")) {
                      return "both";
                    } else {
                      return "sco";
                    }
                  });
                } else {
                  setSelectedType((prevType) => {
                    if (prevType === "both") {
                      return "sup";
                    } else {
                      return "";
                    }
                  });
                }
              }}
              checked={selectedType.includes("sco") || selectedType === "both"}
            />
            <div
              className={`${classes.container_img_level} ${
                (selectedType.includes("sco") || selectedType === "both") &&
                classes.scoBorder
              }`}
            >
              {selectedType.includes("sco") || selectedType === "both" ? (
                <img src={markerSup} alt="" />
              ) : null}
            </div>
            <label htmlFor="sco" className={classes.map_label}>
              Scolaire
            </label>
          </div>
          <div className={classes.form_control}>
            <input
              type="checkbox"
              id="sup"
              name="type"
              value="sup"
              className={classes.input_checkbox}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedType((prevType) => {
                    if (prevType.includes("sco")) {
                      return "both";
                    } else {
                      return "sup";
                    }
                  });
                } else {
                  setSelectedType((prevType) => {
                    if (prevType === "both") {
                      return "sco";
                    } else {
                      return "";
                    }
                  });
                }
              }}
              checked={selectedType.includes("sup") || selectedType === "both"}
            />
            <div
              className={`${classes.container_img_level} ${
                (selectedType.includes("sup") || selectedType === "both") &&
                classes.supBorder
              }`}
            >
              {selectedType.includes("sup") || selectedType === "both" ? (
                <img src={markerSco} alt="" />
              ) : null}
            </div>
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
                    setDrawerBottomIsOpen(true);
                  },
                }}
              >
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
        <MapCardDrawerBottom show={drawerBottomIsOpen}>
          {schoolDrawer && (
            <div className={classes.container_infos_drawer}>
              <div className={classes.container_img_drawer_bottom}>
                {schoolDrawer.imgPath1 ? (
                  <img src={schoolDrawer.imgPath1} alt="" />
                ) : (
                  <img src={schoolIcon} alt="" />
                )}
                <button
                  className={classes.drawer_close_btn_bottom}
                  onClick={() => setDrawerBottomIsOpen(false)}
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
        </MapCardDrawerBottom>
        ;
      </MapContainer>
    </>
  );
};

export default Map;
