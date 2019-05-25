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

})
