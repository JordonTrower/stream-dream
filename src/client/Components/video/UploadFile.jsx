import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import styled from 'styled-components';
import GoX from 'react-icons/lib/go/x';
import PropTypes from 'prop-types';
import ButtonGroup from '../../styled/common/ButtonGroup';
import CancelButton from '../../styled/common/CancelButton';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';
import SubmitButton from '../../styled/common/SubmitButton';
import UploadFileCSS from '../../styled/common/UploadFile';

const MsgDiv = styled.div`
	margin: 10px;
	text-align: center;
`;

const ErrDiv = styled.div`
	margin: 10px;
	text-align: center;
	color: red;
`;

const dropzoneStyle = {
	textAlign: 'center',
	padding: '4rem',
	border: '2px dashed grey',
	borderRadius: '25px',
	height: '6rem'
};

const StyleSelect = styled(Select)`
	width: 100%;
	height: 38px;
	color: #000;
	margin: 2rem;
	margin-left: 0rem;
	margin-right: 0;
	padding: 0.5rem;
`;

export default class UploadFile extends Component {
	constructor() {
		super();

		this.state = {
			title: '',
			media: '',
			medianame: '',
			filename: '',
			errorMsg: '',
			selectOptions: [],
			selectedOption: '',
			gameid: ''
		};
	}

	componentDidMount() {
		axios.get('/api/channels').then(response => {
			const tempOptions = [];

			response.data.forEach(option => {
				tempOptions.push({ value: option.id, label: option.title });
			});
			this.setState({ selectOptions: tempOptions });
		});
	}

	onDrop(media) {
		if (media.length === 0) {
			console.log('File too large. 100mb limit.');
		} else {
			this.setState({
				media: media[0],
				medianame: `videos/${media[0].name}`,
				filename: media[0].name
			});
		}
	}

	updateGameID(option) {
		this.setState({
			selectedOption: option,
			gameid: option.value
		});
	}

	updateTitle(val) {
		this.setState({
			title: val
		});
	}

	uploadFile() {
		if (
			this.state.title !== '' &&
			this.state.medianame !== '' &&
			this.state.gameid !== ''
		) {
			const data = new FormData();

			data.append('media', this.state.media);
			data.append('name', this.state.medianame);

			axios.post('/api/upload', data).then(res =>
				axios
					.post('/api/video', {
						title: this.state.title,
						game_id: this.state.gameid,
						link: res.data.Location
					})
					.then(() => this.props.loadVideos())
					.then(() => this.clearState())
			);
		} else {
			this.setState({
				errorMsg: 'Please select a file and/or enter a title.'
			});
		}
	}

	clearState() {
		this.setState({
			title: '',
			media: '',
			medianame: '',
			filename: '',
			errorMsg: '',
			selectOptions: [],
			gameid: ''
		});
	}

	render() {
		return (
			<UploadFileCSS>
				<Dropzone
					maxSize={100000000}
					style={dropzoneStyle}
					onDrop={file => this.onDrop(file)}
				>
					{this.state.media ? (
						<video height="100%" width="100%" muted>
							<source
								src={this.state.media.preview}
								alt="Game Preview"
							/>
						</video>
					) : (
						<p>
							Drop your file to upload here or click to select a
							file to upload.
						</p>
					)}
				</Dropzone>

				<MsgDiv>{this.state.filename}</MsgDiv>

				<StyleSelect
					value={this.state.selectedOption}
					onChange={e => this.updateGameID(e)}
					options={this.state.selectOptions}
				/>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Video Title</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="text"
							value={this.state.title}
							onChange={e => this.updateTitle(e.target.value)}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<ButtonGroup>
					<CancelButton>
						<GoX
							color="#C40F62"
							size="35"
							type="button"
							onClick={() => {
								this.clearState();
							}}
						/>
					</CancelButton>
					<SubmitButton
						type="button"
						onClick={() => {
							this.uploadFile();
						}}
					>
						Upload File
					</SubmitButton>
				</ButtonGroup>

				<ErrDiv>{this.state.errorMsg}</ErrDiv>
			</UploadFileCSS>
		);
	}
}

UploadFile.propTypes = {
	loadVideos: PropTypes.func.isRequired
};
