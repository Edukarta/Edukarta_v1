import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classes from "./MapDrawer.module.css";


const MapDrawer = props => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-bottom"
      mountOnEnter
      unmountOnExit
    >
      <section className={classes.mapDrawer} onClick={props.onClick}>{props.children}</section>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default MapDrawer;