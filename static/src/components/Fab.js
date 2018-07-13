import React from "react";
import PropTypes from "prop-types";

const Fab = props => (
  <button className="mdc-fab app-fab--absolute" aria-label="Favorite">
    <span className="mdc-fab__icon material-icons">{props.icon}</span>
  </button>
);

Fab.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Fab;
