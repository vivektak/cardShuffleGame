import React from 'react';
import { shallow, configure, expect } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Controls from './Controls.jsx';
import sinon from 'sinon';

//configure({ adapter: new Adapter() });

describe('Controls test cases', () => {
    it('the app should have text', () => {
        const app = shallow(<Controls />);
        expect(app.contains('.text-left')).toBe(true);
    })

    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<button onClick={props.shuffle} />);
        wrapper.find('button').simulate('click');
        expect(props.shuffle).to.have.property('callCount', 1);
    });


    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((
    //         <button className='btn btn-primary' onClick={props.shuffle}>Play/Shuffle</button>
    //     ));
    //     wrapper.find('.btn-primary').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });


    // let wrapper;
    // let props;
    // beforeEach(() => {
    //     props = {
    //         shuffle: () => { },
    //         reset: () => { }
    //     }
    //     wrapper = shallow(<button {...props} />);
    // });

    // afterEach(() => {
    //     jest.resetAllMocks();
    // });

    // it('should verify that component exists', () => {
    //     expect(wrapper.exists()).toEqual(true);
    // });

    // it('checking Play/shuffle button rendered', () => {
    //     expect(wrapper.find('.btn-primary').text()).toBe('Play/shuffle');
    // });

    // it('renders an `.icon-star`', () => {
    //     //const wrapper = shallow(<Controls />);
    //     expect(wrapper.find('.btn-primary')).to.have.lengthOf(1);
    // });
})