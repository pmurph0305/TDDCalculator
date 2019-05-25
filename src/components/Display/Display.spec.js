import React from 'react';
import { shallow } from 'enzyme';

import Display from './Display';

describe('Display tests', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Display displayedValue={''}/>))

    it('Renders a div element', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })

    it('Renders the value fo displayed value', () => {
        wrapper.setProps({ displayedValue: 'testing' });
        expect(wrapper.text()).toEqual('testing');
    })
})