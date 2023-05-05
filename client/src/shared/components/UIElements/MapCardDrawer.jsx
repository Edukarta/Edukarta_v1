import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classes from "./MapCardDrawer.module.css";

const MapCardDrawer = props => {
    const content = (
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-top"
        mountOnEnter
        unmountOnExit
      >
        <section className={classes.mapCardDrawer} onClick={props.onClick}>{props.children}</section>
      </CSSTransition>
    );
  
    return ReactDOM.createPortal(content, document.getElementById('map-card-drawer-hook'));
  };
  
  export default MapCardDrawer;