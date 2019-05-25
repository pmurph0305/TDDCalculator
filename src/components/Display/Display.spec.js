import React from 'react';
import { shallow } from 'enzyme';

import Display from './Display';

describe('Display tests', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Display/>))

    it('Renders a div element', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })
})