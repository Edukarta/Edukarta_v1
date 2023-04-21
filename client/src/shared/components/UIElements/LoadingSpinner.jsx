import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring">
        <div className="container_logo_edu">
          <img
            src="https://www.edukarta.com/_nuxt/img/education-token.5b2332d.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
