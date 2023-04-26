import React from "react";
import logoEdu from "../../../img/logoedu.jpg";
import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring">
        <div className="container_logo_edu">
          <img
            src={logoEdu}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
