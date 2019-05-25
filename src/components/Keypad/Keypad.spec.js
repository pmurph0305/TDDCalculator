import React from "react";
import { shallow } from "enzyme";

import Keypad from "./Keypad";

describe("Keypad tests", () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = shallow(
        <Keypad
          callOperator={jest.fn()}
          numbers={[]}
          operators={[]}
          setOperator={jest.fn()}
          updateDisplay={jest.fn()}
        />
      ))
  );

  it("Renders 2 divs", () => {
    expect(wrapper.find("div").length).toEqual(2);
  });

  it("Renders the values of numbers", () => {
    wrapper.setProps({numbers: ['0','1','2','3']});
    expect(wrapper.find('.numbers-container').text()).toEqual('0123')
  })
});
