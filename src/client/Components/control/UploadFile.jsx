import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UploadFileCSS from '../../styled/common/UploadFile';

export default class UploadFile extends Component {
	constructor() {
		super();

		this.state = {
			title: '',
			media: '',
			medianame: ''
		};
	}

	onDrop(media) {
		console.log(media[0]);
		if (media.length === 0) {
			console.log('File too large. 100mb limit.');
		} else {
			this.setState({
				media: media[0],
				medianame: `videos/${media[0].name}`
			});
		}
	}

	updateTitle(val) {
		this.setState({
			title: val
		});
	}

	uploadFile() {
		const data = new FormData();
		data.append('media', this.state.media);
		data.append('name', this.state.medianame);
		axios.post('/api/upload', data).then(res =>
			axios
				.post('/api/video', {
					title: this.state.title,
					link: res.data.Location
				})
				.then(() => this.props.loadVideos())
				.then(this.setState({ title: '' }))
		);
	}

	render() {
		return (
			<UploadFileCSS>
				<Dropzone
					maxSize={100000000}
					onDrop={file => this.onDrop(file)}
				>
					<p>
						Try dropping some files here, or click to select files
						to upload.
					</p>
				</Dropzone>
				<input
					type="text"
					value={this.state.title}
					onChange={e => this.updateTitle(e.target.value)}
				/>
				Video Title
				<button
					type="button"
					onClick={() => {
						this.uploadFile();
					}}
				>
					Upload File
				</button>
			</UploadFileCSS>
		);
	}
}

UploadFile.propTypes = {
	loadVideos: PropTypes.func.isRequired
};
