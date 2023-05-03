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
      zoom={7}
      minZoom={6}
      className={classes.mapContainer}
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      {props.school.gps[0] && props.school.gps[1] && (
        <Marker position={[props.school.gps[0], props.school.gps[1]]} icon={customMarker}>
          <Popup>
            <div className={classes.container_Popup}>
              <div className={classes.container_Popup_img}>
                <img src={props.school.imgPath} alt="image de l'école" />
              </div>
              <div className={classes.container_infos}>
                <h1 className={classes.popup_schoolName}>{props.school.name}</h1>
                <div className={classes.container_infos_item}>
                  <LocationOn sx={{ color: "#324964" }} />
                  <p className={classes.container_infos_address}>{props.school.address}</p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapDetails;
