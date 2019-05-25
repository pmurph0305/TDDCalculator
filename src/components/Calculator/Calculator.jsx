import React from "react";

import Display from "../Display/Display";
import KeyPad from "../Keypad/Keypad";

import "./Calculator.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Value to be displayed with Display
      displayedValue: "0",
      // Numbers for Keys
      numbers: ["9", "8", "7", "6", "5", "4", "3", "2", "1", ".", "0", "CE"],
      // Operators for Keys
      operators: ["+", "-", "/", "*"],
      // Operator selected for math
      selectedOperator: "",
      // Stored calculated value for math
      storedValue: 0
    };
  }

  updateDisplay = value => {
    let {displayedValue} = this.state;
    if (displayedValue)
    if (displayedValue=== "0") {
      displayedValue = value;
    } else if (value === 'CE') {
      if (displayedValue.length > 1) {
        displayedValue = displayedValue.slice(0,displayedValue.length-1);
      } else {
        displayedValue = '0'
      }
    } else if (value === '.') {
      if (displayedValue.includes('.') === false) {
        displayedValue += '.'
      }
    }
    else {
      displayedValue += value;
    }
    this.setState({displayedValue: displayedValue})
  };

  callOperator = () => {};

  setOperator = () => {};

  render() {
    const { displayedValue, numbers, operators } = this.state;
    return (
      <div className="calculator-container">
        <Display displayedValue={displayedValue} />
        <KeyPad
          callOperator={this.callOperator}
          numbers={numbers}
          operators={operators}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }
}

export default Calculator;
