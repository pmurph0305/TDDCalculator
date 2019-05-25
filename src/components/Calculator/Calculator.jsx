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
      storedValue: "0"
    };
  }

  updateDisplay = value => {
    let { displayedValue, storedValue } = this.state;
    if (displayedValue === storedValue && value !== 'CE') {
      displayedValue = value;
    } else if (value === "CE") {
      if (displayedValue.length > 1 && displayedValue !== "CE") {
        displayedValue = displayedValue.slice(0, displayedValue.length - 1);
      } else {
        displayedValue = "0";
      }
    } else if (displayedValue === "0") {
      displayedValue = value;
    } else if (value === ".") {
      if (displayedValue.includes(".") === false) {
        displayedValue += ".";
      }
    } else {
      displayedValue += value;
    }
    this.setState({ displayedValue: displayedValue });
  };

  callOperator = () => {
    let { displayedValue, storedValue, selectedOperator } = this.state;

    //let updatedStoredValue = displayedValue;
    displayedValue = parseFloat(displayedValue);
    storedValue = parseFloat(storedValue);
    
    if (selectedOperator === "+") {
      displayedValue = storedValue + displayedValue;
    } else if (selectedOperator === "-") {
      displayedValue = storedValue - displayedValue;
    } else if (selectedOperator === "*") {
      displayedValue = storedValue * displayedValue;
    } else if (selectedOperator === "/") {
      displayedValue = storedValue / displayedValue;
    } else {
      displayedValue = "0";
    }

    displayedValue = displayedValue.toString();
    selectedOperator = "";
    if (displayedValue === "NaN" || displayedValue === "Infinity") {
      displayedValue = "0";
    }

    this.setState({
      displayedValue,
      selectedOperator,
      storedValue: displayedValue
    });
  };



  setOperator = operator => {
    let { selectedOperator, displayedValue, storedValue } = this.state;
    if (selectedOperator === "") {
      storedValue = displayedValue;
      selectedOperator = operator;
      displayedValue = "0";
      this.setState({ selectedOperator, displayedValue, storedValue });
    } else if (storedValue !== '0' && displayedValue !== '0') {
      this.callOperator();
      selectedOperator = operator;
      this.setState({selectedOperator, displayedValue: '0'})
    } else {
      selectedOperator = operator;
      this.setState({ selectedOperator, displayedValue, storedValue }); 
    }
  };

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
