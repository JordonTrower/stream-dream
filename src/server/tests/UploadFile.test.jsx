import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import UploadFile from '../../client/Components/video/UploadFile';

Enzyme.configure({ adapter: new Adapter() })

function loadVideos(){
	console.log('videos loaded')
}

it('should render', () => {
	const uploadFileComponent = shallow(<UploadFile loadVideos={loadVideos}/>);
	const tree = toJson(uploadFileComponent);
	expect(tree).toMatchSnapshot();
});

test('clearState clears the state', () => {
	const uploadFileComponent = shallow(<UploadFile loadVideos={loadVideos}/>);
	uploadFileComponent.setState({ 
		title: 'Title',
		media: {picture: 'yada yada yada'},
		medianame: 'Name',
		filename: 'File Name',
		errorMsg: 'Error Message',
		selectOptions: [{value: 1, label: 'Label'}],
		gameid: '9999',
	})

	uploadFileComponent.instance().clearState();

	expect (uploadFileComponent.state('title')).toEqual('');
	expect (uploadFileComponent.state('media')).toEqual('');
	expect (uploadFileComponent.state('medianame')).toEqual('');
	expect (uploadFileComponent.state('filename')).toEqual('');
	expect (uploadFileComponent.state('errorMsg')).toEqual('');
	expect (uploadFileComponent.state('selectOptions')).toEqual([]);
	expect (uploadFileComponent.state('gameid')).toEqual('');
})

test('tests setting title state through updateTitle', () => {
	const uploadFileComponent = shallow(<UploadFile loadVideos={loadVideos}/>);

	uploadFileComponent.instance().clearState();

	uploadFileComponent.instance().updateTitle('Big Red Panda');

	expect (uploadFileComponent.state('title')).toBe('Big Red Panda');
	expect (uploadFileComponent.state('title')).not.toBe('Big Purple Panda');
})

test('test updating game id', () => {
	const uploadFileComponent = shallow(<UploadFile loadVideos={loadVideos}/>);

	uploadFileComponent.instance().clearState();

	const option = {value: 99, label: 'The Mother of All Labels'}

	uploadFileComponent.instance().updateGameID(option);

	expect (uploadFileComponent.state('gameid')).toBe(99);
	expect (uploadFileComponent.state().selectedOption).toMatchObject(option);
	expect (uploadFileComponent.state().selectedOption.value).toBe(99);
	expect (uploadFileComponent.state().selectedOption.label).toBe('The Mother of All Labels');
})

test('test onDrop', () => {
	const uploadFileComponent = shallow(<UploadFile loadVideos={loadVideos}/>);

	uploadFileComponent.instance().clearState();

	const media = [{name: 'The File Name'}]

	uploadFileComponent.instance().onDrop(media);

	expect (uploadFileComponent.state('filename')).toBe('The File Name');
})

