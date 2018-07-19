import React, { Component }from 'react';
import S3FileUpload from 'react-s3';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UploadFileCSS from '../../styled/common/UploadFile'

const { REACT_APP_S3_BUCKET_NAME, REACT_APP_S3_REGION, REACT_APP_S3_ACCESS_KEY_ID, REACT_APP_S3_SECRET_ACCESS_KEY } = process.env

export default class UploadFile extends Component {
	constructor() {
		super()
		
		this.state = {
			file: '',
			title: '',
		}
	}

	onDrop(file){
		console.log(file)
		if (file.length === 0) {
			console.log("File too large. 100mb limit.")
		} else {
			this.setState({
				file: file[0]
			})
		}

	}

	updateTitle(val){
		this.setState({
			title: val,
		})
	}

	uploadFile() {
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
	}

	render() {
		
		return (

			<UploadFileCSS>
				<Dropzone maxSize={10} onDrop={(file) => this.onDrop(file)}>
           			<p>Try dropping some files here, or click to select files to upload.</p>
          		</Dropzone>

				
				<input type="text" 
					value={this.state.title}
					onChange={ ( e ) => this.updateTitle( e.target.value ) }/>
				Video Title
				

				<button type="button" onClick={() => { this.uploadFile() }}>
					Upload File
				</button>
			</UploadFileCSS>
		)
	}
}