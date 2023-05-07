import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { Link } from "react-router-dom";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useDispatch, useSelector } from "react-redux";
import { setSchool } from "../../state/store";
import { LocationOn, School, Flag, MenuBook } from "@mui/icons-material";
import customMarkerImage from "../../../img/pin.png";
import MapCardDrawer from "./MapCardDrawer";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";

const Map = ({ type, schools }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const dispatch = useDispatch();
  const schoolDrawer = useSelector((state) => state.school);
  const customMarker = new Icon({
    iconUrl: customMarkerImage,
    iconSize: [38, 38],
  });
  const cretaedCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="${
        classes.cluster_icon
      }">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <MapContainer
      center={[46.232192999999995, 2.209666999999996]}
      zoom={4}
      minZoom={3}
      bounceAtZoomLimits={false}
      scrollWheelZoom={0.2}
      className={
        type === "homepage" ? classes.mapContainer : classes.mapContainer_map
      }
    >
      <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={cretaedCustomClusterIcon}
      >
        {schools.schools?.map((school) => {
          if (school.gps[0] && school.gps[1]) {
            return (
              <Marker
                position={school.gps}
                icon={customMarker}
                id={school.id}
                key={school.id}
                eventHandlers={{
                  click: () => {
                    dispatch(setSchool({ school }));
                    setDrawerIsOpen(true);
                  },
                }}
              >
                <Link to={`/school/${school.id}`}>
                  <Popup>
                    {type !== "homepage" ? (
                      <div className={classes.container_Popup}>
                        <div className={classes.container_Popup_img}>
                          {school.imgPath ? (
                            <img src={school.imgPath} alt="image de l'école" />
                          ) : (
                            <img
                              src="https://www.edukarta.com/_nuxt/img/education-token.5b2332d.jpg"
                              alt="image de l'école"
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
      </MarkerClusterGroup>
      <MapCardDrawer show={drawerIsOpen}>
        {schoolDrawer && (
          <div className={classes.container_infos_drawer}>
            <div className={classes.container_img_drawer}>
              <img src={schoolDrawer.imgPath} alt="" />
            </div>
            <div className={classes.container_infos}>
              <Link to={`/school/${schoolDrawer.id}`}>
                <h3 className={classes.school_drawer_name}>
                  {schoolDrawer.name}
                </h3>
              </Link>
              <div className={classes.school_drawer_infos_items}>
                <div className={classes.school_drawer_info}>
                  <LocationOn sx={{ color: "#0275d8" }} />
                  <h5>{schoolDrawer.address}</h5>
                </div>
                <div className={classes.school_drawer_info}>
                  <Flag sx={{ color: "#0275d8" }} />
                  <h5>{schoolDrawer.country}</h5>
                </div>
                <div className={classes.school_drawer_info}>
                  <School sx={{ color: "#0275d8" }} />
                  <h5>{schoolDrawer.level}</h5>
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
  );
};

export default Map;
