import React from "react";

import { shallow, mount } from "enzyme";

import Calculator from "./Calculator";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

describe("Shallow Calculator tests", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("Renders a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("Should render Display & Keypad Components", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <Display displayedValue={wrapper.instance().state.displayedValue} />,
        <Keypad
          callOperator={wrapper.instance().callOperator}
          numbers={wrapper.instance().state.numbers}
          operators={wrapper.instance().state.operators}
          setOperator={wrapper.instance().setOperator}
          updateDisplay={wrapper.instance().updateDisplay}
        />
      ])
    ).toEqual(true);
  });

  it("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Mounted Calculator Tests", () => {
  let wrapper;

  beforeEach(() => (wrapper = mount(<Calculator />)));

  it("Calls update display when a number key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "updateDisplay");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find(".number-key")
      .first()
      .simulate("click");
    wrapper
      .find(".number-key")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("Calls callOperator when submit key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "callOperator");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find(".submit-key")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Calls setOperator when operator key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "setOperator");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find(".operator-key")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Calculator updateDisplay tests", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("updates displayValue", () => {
    wrapper.instance().updateDisplay("7");
    expect(wrapper.state("displayedValue")).toEqual("7");
  });

  it("concatenates displayValue", () => {
    wrapper.instance().updateDisplay("3");
    wrapper.instance().updateDisplay("2");
    expect(wrapper.state("displayedValue")).toEqual("32");
  });

  it('removes leading "0" from displayValue', () => {
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayedValue")).toEqual("0");
    wrapper.instance().updateDisplay("1");
    expect(wrapper.state("displayedValue")).toEqual("1");
  });

  it('does not allow multiple leading "0"s in displayValue', () => {
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayedValue")).toEqual("0");
  });

  it("removes last char of displayValue", () => {
    wrapper.instance().updateDisplay("3");
    wrapper.instance().updateDisplay("4");
    wrapper.instance().updateDisplay("CE");
    expect(wrapper.state("displayedValue")).toEqual("3");
  });

  it("prevents multiple instances of a . in displayValue", () => {
    wrapper.instance().updateDisplay("4");
    wrapper.instance().updateDisplay(".");
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay(".");
    wrapper.instance().updateDisplay("4");
    expect(wrapper.state("displayedValue")).toEqual("4.04");
  });

  it('will set display value to "0" if it is equal to an empty string', () => {
    wrapper.instance().updateDisplay("1");
    wrapper.instance().updateDisplay("CE");
    expect(wrapper.state("displayedValue")).toEqual("0");
  });

  it('resets displayed after callOperator on new input', () => {
    wrapper.setState({ storedValue: '5' });
    wrapper.setState({ displayedValue: '2' });
    wrapper.setState({ selectedOperator: '-' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('3');
    expect(wrapper.state('storedValue')).toEqual('3');
    wrapper.instance().updateDisplay('1');
    expect(wrapper.state('displayedValue')).toEqual('1');

  })
});

describe("Calculate setOperator tests", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  // update value of selectedOperator
  it('Updates the value of selectedOperator', () => {
    wrapper.instance().setOperator('*');
    expect(wrapper.state('selectedOperator')).toEqual('*')
    wrapper.instance().setOperator('-');
    expect(wrapper.state('selectedOperator')).toEqual('-')
  })
  // updates stored value to value of displayValue
  it ('Updates the stored value of displayed value', () => {
    wrapper.setState({ displayedValue: '3' });
    wrapper.instance().setOperator('-');
    expect(wrapper.state('storedValue')).toEqual('3')
  })

  // updates value of display value to 0
  it('Updates the value of display value to "0"', () => {
    wrapper.setState({ displayedValue: '3' });
    wrapper.instance().setOperator('*');
    expect(wrapper.state('displayedValue')).toEqual('0')
  })

  // selected operator is not an empty string, does not update storedValue
  it('If selected operator is not currently empty and no displayed value, does not update storedValue', () => {
    wrapper.setState({ displayedValue: '3' });
    wrapper.instance().setOperator('*');
    expect(wrapper.state('storedValue')).toEqual('3')
    wrapper.instance().setOperator('-');
    expect(wrapper.state('storedValue')).toEqual('3')
  })

  it('If displayed & stored value are not empty, updates stored value to result and displayed value to 0', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ selectedOperator: '*'})
    wrapper.setState({ displayedValue: '4' });
    wrapper.instance().setOperator('+');
    expect(wrapper.state('selectedOperator')).toEqual('+')
    expect(wrapper.state('storedValue')).toEqual('12');
    expect(wrapper.state('displayedValue')).toEqual('0');
  })
  
});

describe('Calculate callOperator tests', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  // update display value to sum of stored and display value
  it('Updates display value to sum of stored + displayedValue', () => {
    wrapper.setState({ storedValue: '7' });
    wrapper.setState({ displayedValue: '3' });
    wrapper.setState({ selectedOperator: '+' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('10');
  })
  // update display value to difference of stored and display value
  it('Updates display value to difference of stored - displayedValue', () => {
    wrapper.setState({ storedValue: '5' });
    wrapper.setState({ displayedValue: '2' });
    wrapper.setState({ selectedOperator: '-' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('3');
  })
  // update display value to product of stored and display value
  it('Updates display value to product of stored * displayedValue', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ displayedValue: '6' });
    wrapper.setState({ selectedOperator: '*' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('18');
  })
  // update display value to quotient of stored and display value
  it('Updates display value to quotient of stored / displayedValue', () => {
    wrapper.setState({ storedValue: '12' });
    wrapper.setState({ displayedValue: '3' });
    wrapper.setState({ selectedOperator: '/' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('4');
  })

  // Displays 0 if NaN result
  it("Updates display to '0' if operation results in 'NaN'", () => {
    wrapper.setState({ storedValue: '12' });
    wrapper.setState({ displayedValue: 't' });
    wrapper.setState({ selectedOperator: '/' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('0');
  })

  // Displays 0 if Infinity result
  it("Updates display to '0' if operation results in 'Infinity'", () => {
    wrapper.setState({ storedValue: '12' });
    wrapper.setState({ displayedValue: '0' });
    wrapper.setState({ selectedOperator: '/' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('0');
  })

  // Displays 0 if missingv alues for stored or selected operator
  it("Updates display to '0' is missing stored or selected operator'", () => {
    wrapper.setState({ storedValue: '' });
    wrapper.setState({ displayedValue: '10' });
    wrapper.setState({ selectedOperator: '' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('0');
    wrapper.setState({ storedValue: '' });
    wrapper.setState({ displayedValue: '9' });
    wrapper.setState({ selectedOperator: '+' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('0');
  })

  it("Correctly uses decimal places in calculations", () => {
    wrapper.setState({ storedValue: '11' });
    wrapper.setState({ displayedValue: '5.5' });
    wrapper.setState({ selectedOperator: '/' });
    wrapper.instance().callOperator();
    expect(wrapper.state('displayedValue')).toEqual('2');
  })
})