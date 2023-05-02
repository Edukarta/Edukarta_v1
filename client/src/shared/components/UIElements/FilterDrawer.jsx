import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classes from "./FilterDrawer.module.css";

const FilterDrawer = props => {
    const content = (
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-top"
        mountOnEnter
        unmountOnExit
      >
        <section className={classes.filterDrawer} onClick={props.onClick}>{props.children}</section>
      </CSSTransition>
    );
  
    return ReactDOM.createPortal(content, document.getElementById('filter-drawer-hook'));
  };
  
  export default FilterDrawer;