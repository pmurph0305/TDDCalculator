import React from "react";
import PropTypes from "prop-types";

import './Display.css';

const Display = ({ displayedValue }) => (
  <div className="display-container">
    <p className="display-value">{displayedValue}</p>
  </div>
);

Display.propTypes = { displayedValue: PropTypes.string.isRequired };

export default Display;
