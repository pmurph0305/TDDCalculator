import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Value to be displayed with Display
            displayValue: '0',
            // Numbers for Keys
            numbers: [],
            // Operators for Keys
            operators: [],
            // Operator selected for math
            selectedOperator: '',
            // Stored calculated value for math
            storedValue: 0
        }
    }

    render() {
        return(
            <div className='calculator-container'></div>
        )
    }
}

export default Calculator;