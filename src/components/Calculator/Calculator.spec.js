import React from "react";

import { shallow } from "enzyme";

import Calculator from "./Calculator";
import Display from "../Display/Display";
import Keypad from '../Keypad/Keypad';

describe("Calculator tests", () => {
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

});
