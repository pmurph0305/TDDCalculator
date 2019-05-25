import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calculator from '../Calculator/Calculator';

describe('App tests', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<App/>))

    it('Should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })

    it('Should contain a calculator element', () => {
        expect(wrapper.containsMatchingElement(<Calculator/>)).toEqual(true);
    })
})