import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classes from "./MapCardDrawerBottom.module.css";

const MapCardDrawerBottom = props => {
    const content = (
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-bottom"
        mountOnEnter
        unmountOnExit
      >
        <section className={classes.mapCardDrawer} onClick={props.onClick}>{props.children}</section>
      </CSSTransition>
    );
  
    return ReactDOM.createPortal(content, document.getElementById('map-card-drawer-bottom-hook'));
  };
  
  export default MapCardDrawerBottom;