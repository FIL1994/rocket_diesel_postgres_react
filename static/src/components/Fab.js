import React from "react";
import PropTypes from "prop-types";

const Fab = props => (
  <button
    className={`mdc-fab app-fab--absolute ${props.mini && "mdc-fab--mini"}`}
    aria-label="Favorite"
  >
    <span className="mdc-fab__icon material-icons">{props.icon}</span>
  </button>
);

Fab.defaultProps = {
  mini: false
};

Fab.propTypes = {
  icon: PropTypes.string.isRequired,
  mini: PropTypes.bool
};

export default Fab;
