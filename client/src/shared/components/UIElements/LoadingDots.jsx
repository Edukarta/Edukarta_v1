import React from 'react';
import "./LoadingDots.css";

const LoadingDots = (props) => {
  return (
    <div className='container_dots'>
        <div className={props.white ? "dot1white" : "dots1" }></div>
        <div className={props.white ? "dot2white" : "dots2" }></div>
        <div className={props.white ? "dot3white" : "dots3" }></div>
    </div>
  )
}

export default LoadingDots