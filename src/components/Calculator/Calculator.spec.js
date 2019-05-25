import React from 'react';

import { shallow } from 'enzyme';

import Calculator from './Calculator';
import Display from '../Display/Display';

describe('Calculator tests', () => {
    let wrapper;

    beforeEach(() => wrapper=shallow(<Calculator/>));

    it('Renders a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })

    it('Contains the <Display /> compoennt', () => {
        expect(wrapper.containsMatchingElement(<Display />)).toEqual(true);
    })
})