import React from 'react';

import { shallow } from 'enzyme';

import Calculator from './Calculator';

describe('Calculator tests', () => {
    let wrapper;

    beforeEach(() => wrapper=shallow(<Calculator/>));

    it('Renders a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })
})