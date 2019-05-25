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
    if (this.state.displayedValue === "0") {
      this.setState({ displayedValue: value });
    } else if (value === 'CE') {
      this.setState(state=> {
        return {displayedValue: state.displayedValue.slice(0,state.displayedValue.length-1)}
      })
    } else if (value === '.') {
      if (this.state.displayedValue.includes('.') === false) {
        this.setState(state => {
          return { displayedValue: state.displayedValue + value };
        });
      }
    }
    else {
      this.setState(state => {
        return { displayedValue: state.displayedValue + value };
      });
    }
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
