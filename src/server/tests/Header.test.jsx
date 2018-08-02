import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Header from "../../client/Components/nav/Header";

Enzyme.configure({ adapter: new Adapter() });

it('Should render the Header component.', () =>  {
	const headerComponent = shallow(<Header store={{user: {email: '', display_name: '', avatar: '',	id: -1}}} />);
	const tree = toJson(headerComponent);
	expect(tree).toMatchSnapshot();
});

test('switchModals invoked switches appropriate state items.', () => {
	const headerComponent = shallow(<Header store={{user: {email: '', display_name: '', avatar: '',	id: -1}}} />);
    
	headerComponent.setState({
		login: true
	})
    
	headerComponent.instance().switchModals()
    
	expect(headerComponent.state('login')).toEqual(false);
	expect(headerComponent.state('register')).toEqual(true);
});

test('closeModal invoked sets login, register, and userInfo items on state to false.', () => {
	const headerComponent = shallow(<Header store={{user: {email: '', display_name: '', avatar: '',	id: -1}}} />);

	headerComponent.setState({
		login: true,
		register: true,
		userInfo: true
	});

	headerComponent.instance().closeModal();

	expect(headerComponent.state('login')).toEqual(false);
	expect(headerComponent.state('register')).toEqual(false);
	expect(headerComponent.state('userInfo')).toEqual(false);
    
})