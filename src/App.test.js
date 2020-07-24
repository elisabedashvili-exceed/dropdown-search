import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App'

Enzyme.configure({ adapter: new Adapter() });

describe('Dropdown', () => {
    it('nothing special', () => {
        const wrapper = shallow(<App/>);
        const list = wrapper.find('#listbar')
        expect(list.text()).toBe("Load More");
    })
    it('should show list', () => {
        const wrapper = shallow(<App/>);
        const inputBar = wrapper.find('.regInputField');
        inputBar.simulate('click');
        const list = wrapper.find('#listbar div')
        expect(list.length).toBe(101);
    })
})