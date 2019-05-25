import React from 'react';
import { shallow } from 'enzyme';

import Key from './Key';

describe('Key tests', () => {
  let wrapper;
  beforeEach(()=> wrapper=shallow(<Key
    keyAction={jest.fn()}
    keyType={''}
    keyValue={''}
  />))
  
  it('Should render a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  })

  it('Should contain a keyValue', () => {
    wrapper.setProps({ keyValue: 'testvalue' })
    expect(wrapper.text()).toEqual('testvalue')
  })
})