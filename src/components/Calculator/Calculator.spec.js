import React from "react";

import { shallow, mount } from "enzyme";

import Calculator from "./Calculator";
import Display from "../Display/Display";
import Keypad from '../Keypad/Keypad';

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

  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

});

describe('Mounted Calculator Tests', () => {
  let wrapper;

  beforeEach(() => (wrapper = mount(<Calculator />)));

  it('Calls update display when a number key is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.number-key').first().simulate('click');
    wrapper.find('.number-key').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
  })

  it('Calls callOperator when submit key is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'callOperator');
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.submit-key').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('Calls setOperator when operator key is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'setOperator');
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.operator-key').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  })
});

describe('Calculator updateDisplay tests', () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it('updates displayValue', () => {
    wrapper.instance().updateDisplay('7');
    expect(wrapper.state('displayedValue')).toEqual('7');
  })

  it('concatenates displayValue', () => {
    wrapper.instance().updateDisplay('3');
    wrapper.instance().updateDisplay('2');
    expect(wrapper.state('displayedValue')).toEqual('32');
  })

  it('removes leading "0" from displayValue', () => {
    wrapper.instance().updateDisplay('0');
    expect(wrapper.state('displayedValue')).toEqual('0');
    wrapper.instance().updateDisplay('1');
    expect(wrapper.state('displayedValue')).toEqual('1');
  })

  it ('does not allow multiple leading "0"s in displayValue', () => {
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('0');
    expect(wrapper.state('displayedValue')).toEqual('0');
  })

  it('removes last char of displayValue', () => {
    wrapper.instance().updateDisplay('3');
    wrapper.instance().updateDisplay('4');
    wrapper.instance().updateDisplay('CE');
    expect(wrapper.state('displayedValue')).toEqual('3');
  })

  it ('prevents multiple instances of a . in displayValue', () => {
    wrapper.instance().updateDisplay('4');
    wrapper.instance().updateDisplay('.');
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('.');
    wrapper.instance().updateDisplay('4');
    expect(wrapper.state('displayedValue')).toEqual('4.04');
  })

  it('will set display value to "0" if it is equal to an empty string', () => {
    wrapper.instance().updateDisplay('1')
    wrapper.instance().updateDisplay('CE');
    expect(wrapper.state('displayedValue')).toEqual('0');
  })
})
