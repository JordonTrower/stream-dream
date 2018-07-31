import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../client/Components/home/Home';

Enzyme.configure({
	adapter: new Adapter()
});

it('should render Home component', () => {
	const homeComponent = shallow(<Home />);
	const tree = toJson(homeComponent);
	expect(tree).toMatchSnapshot();
})

// test('getCarouselVideos updates state with an array of carousel items', () => {

// })