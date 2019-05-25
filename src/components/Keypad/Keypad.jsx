import React from "react";
import PropTypes from "prop-types";

const KeyPad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay
}) => <div className="keypad-container" />;

KeyPad.propTypes = {
  callOperator: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
  setOperator: PropTypes.func.isRequired,
  updateDisplay: PropTypes.func.isRequired,
}

export default KeyPad;