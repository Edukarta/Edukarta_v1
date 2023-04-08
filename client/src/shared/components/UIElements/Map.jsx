import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";

const Map = ({ type }) => {
  return (

      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={5}
        className={
          type === "homepage" ? classes.mapContainer : classes.mapContainer_map
        }
      >
        {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
        <TileLayer url="https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=1896d58ca9f74874ab382b1866dfdd20" />
      </MapContainer>

  );
};

export default Map;
