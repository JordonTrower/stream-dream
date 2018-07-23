import React, { Component }from 'react';
<<<<<<< HEAD:src/client/Components/control/UploadFile.jsx
import S3FileUpload from 'react-s3';
=======
import PropTypes from 'prop-types';
>>>>>>> Mac-DB:src/client/Components/video/UploadFile.jsx
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UploadFileCSS from '../../styled/common/UploadFile'

<<<<<<< HEAD:src/client/Components/control/UploadFile.jsx
const { REACT_APP_S3_BUCKET_NAME, REACT_APP_S3_REGION, REACT_APP_S3_ACCESS_KEY_ID, REACT_APP_S3_SECRET_ACCESS_KEY } = process.env
=======

>>>>>>> Mac-DB:src/client/Components/video/UploadFile.jsx

export default class UploadFile extends Component {
	constructor() {
		super()
		
		this.state = {
			title: '',
			media: '',
			medianame: ''
		}
	}

<<<<<<< HEAD:src/client/Components/control/UploadFile.jsx
	onDrop(file){
		console.log(file)
		if (file.length === 0) {
=======
	onDrop(media){
		console.log(media[0])
		if (media.length === 0) {
>>>>>>> Mac-DB:src/client/Components/video/UploadFile.jsx
			console.log("File too large. 100mb limit.")
		} else {

			this.setState({
				media: media[0],
				medianame: `videos/${media[0].name}`
			})
		}

	}

	updateTitle(val){
		this.setState({
			title: val,
		})
	}

	uploadFile() {
<<<<<<< HEAD:src/client/Components/control/UploadFile.jsx
		const config = {
			bucketName: REACT_APP_S3_BUCKET_NAME,
			dirName: 'videos',
			region: REACT_APP_S3_REGION,
			accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
			secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
		}
		S3FileUpload
			.uploadFile(this.state.file, config)
			.then(res => axios.post('api/',{
				title: this.state.title,
				link: res.location
			}))
			.catch(err => console.log(err))
=======
		const data = new FormData();
		data.append('media', this.state.media)
		data.append('name', this.state.medianame)
		axios.post('/api/upload', data)
			.then((res) => 
				axios.post('/api/video', {
					title: this.state.title,
					link: res.data.Location
				})
					.then(() => this.props.loadVideos())
					.then(this.setState({title: ''})))
>>>>>>> Mac-DB:src/client/Components/video/UploadFile.jsx
	}

	render() {
		
		return (

			
			<UploadFileCSS>
<<<<<<< HEAD:src/client/Components/control/UploadFile.jsx
				<Dropzone maxSize={10} onDrop={(file) => this.onDrop(file)}>
           			<p>Try dropping some files here, or click to select files to upload.</p>
          		</Dropzone>
=======
				<Dropzone maxSize={100000000} onDrop={(file) => this.onDrop(file)}>
					<p>Try dropping some files here, or click to select files to upload.</p>
				</Dropzone>
>>>>>>> Mac-DB:src/client/Components/video/UploadFile.jsx

				
				<input type="text" 
					value={this.state.title}
					onChange={ ( e ) => this.updateTitle( e.target.value ) }/>
				Video Title
				

				<button type="button" onClick={() => { this.uploadFile() }}>
					Upload File
<<<<<<< HEAD:src/client/Components/control/UploadFile.jsx
				</button>
=======
				</SubmitButton>

>>>>>>> Mac-DB:src/client/Components/video/UploadFile.jsx
			</UploadFileCSS>

		)
	}
}

UploadFile.propTypes={
	loadVideos: PropTypes.func.isRequired
}