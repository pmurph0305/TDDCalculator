import React from "react";
import PropTypes from "prop-types";

import Key from "../Key/Key";

import "./Keypad.css";

const KeyPad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay
}) => {
  const numberKeys = numbers.map(num => {
    return (
      <Key
        key={num}
        keyAction={updateDisplay}
        keyType={"number-key"}
        keyValue={num}
      />
    );
  });
  const operatorKeys = operators.map(operator => {
    return (
      <Key
        key={operator}
        keyAction={callOperator}
        keyType={"operator-key"}
        keyValue={operator}
      />
    );
  });

  return (
    <div className="keypad-container">
      <div className="numbers-container">{numberKeys}</div>
      <div className="operators-container">{operatorKeys}</div>
      <div className="submit-container">
        <Key keyAction={callOperator} keyType={"submit-key"} keyValue={"="} />
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
