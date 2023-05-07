import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { LocationOn } from "@mui/icons-material";
import customMarkerImage from "../../../img/pin.png";
import "leaflet/dist/leaflet.css";
import classes from "./MapDetails.module.css";

const MapDetails = (props) => {
  const customMarker = new Icon({
    iconUrl: customMarkerImage,
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      center={[props.school.gps[0], props.school.gps[1]]}
      zoom={16}
      minZoom={10}
      className={classes.mapContainer}
      bounceAtZoomLimits={false}
      scrollWheelZoom={0}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />
      {props.school.gps[0] && props.school.gps[1] && (
        <Marker
          position={[props.school.gps[0], props.school.gps[1]]}
          icon={customMarker}
        ></Marker>
      )}
    </MapContainer>
  );
};

export default MapDetails;
