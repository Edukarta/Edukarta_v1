import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Icon, divIcon, point} from "leaflet";
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
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
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
                key={school.id}
                id={school.id}
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
                      <h5 className={classes.popup_schoolNameSmall}>{school.name}</h5>
                      <p className={classes.popup_schoolAddressSmall}>{school.address}</p>
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
    </MapContainer>
  );
};

export default Map;
