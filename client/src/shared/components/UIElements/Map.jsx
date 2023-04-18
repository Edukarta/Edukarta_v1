import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LocationOn } from "@mui/icons-material";
import customMarkerImage from "../../../img/pin.png";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";


const Map = ({ type, schools }) => {
 

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
      center={[37.09024, -95.712891]}
      zoom={4}
      className={
        type === "homepage" ? classes.mapContainer : classes.mapContainer_map
      }
    >
      <TileLayer url="https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=1896d58ca9f74874ab382b1866dfdd20" />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={cretaedCustomClusterIcon}
      >
        {schools.schools?.map((school) => {
          if (school.gps && school.gps.lat && school.gps.long) {
            const latlng = school.gps.map(parseFloat)
            return (
              <Marker
                position={latlng}
                icon={customMarker}
                key={school.id}
                id={school.id}
              >
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
                    <div></div>
                  )}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
