import React from 'react';

import Display from '../Display/Display'

import './Calculator.css'

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Value to be displayed with Display
            displayedValue: '0',
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
        const { displayedValue } = this.state;
        return(
            <div className='calculator-container'>
                <Display 
                    displayedValue={displayedValue}
                />
            </div>
        )
    }
}

export default Calculator;