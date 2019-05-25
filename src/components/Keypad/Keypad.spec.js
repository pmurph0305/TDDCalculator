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

  it("Renders 3 divs", () => {
    expect(wrapper.find("div").length).toEqual(3);
  });

  it("Renders the values of numbers", () => {
    wrapper.setProps({numbers: ['0','1','2','3']});
    expect(wrapper.find('.numbers-container').text()).toEqual('0123')
  })

  it("Renders the values of operators", () => {
    wrapper.setProps({operators: ['+','-','*','/']});
    expect(wrapper.find('.operators-container').text()).toEqual('+-*/')
  })

  it('Should render Key component', () => {
    const numbers = ['0', '1', '2'];
    const operators = ['-', '*'];
    const submit = 1;
    const keyTotal = numbers.length + operators.length + submit;
    wrapper.setProps({ numbers, operators })
    expect(wrapper.find('Key').length).toEqual(keyTotal);
  })
});
