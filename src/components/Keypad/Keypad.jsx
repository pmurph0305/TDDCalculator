import React from "react";
import PropTypes from "prop-types";

const KeyPad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay
}) => {
  const numberKeys = numbers.map(num => <p key={num}>{num}</p>)
  return (
    <div className="keypad-container">
      <div className="numbers-container">
        {numberKeys}
      </div>
    </div>
  );
};

KeyPad.propTypes = {
  callOperator: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
  setOperator: PropTypes.func.isRequired,
  updateDisplay: PropTypes.func.isRequired
};

export default KeyPad;
