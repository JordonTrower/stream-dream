import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import VideoComments from "../../client/Components/PlayingView/VideoComments";

Enzyme.configure({ adapter: new Adapter() })

it('Should render the VideoComments component.', () => {
	const videoCommentsComponent = shallow(<VideoComments video_id="1"/>);
	const tree = toJson(videoCommentsComponent);
	expect(tree).toMatchSnapshot();
});

test('Cancel invoked clears the userInput item on state.', () => {
	const videoCommentsComponent = shallow(<VideoComments video_id="1"/>);
	videoCommentsComponent.setState({
		userInput: "blah blah"
	});

	videoCommentsComponent.instance().cancel();
    
	expect(videoCommentsComponent.state('userInput')).toEqual('');

})