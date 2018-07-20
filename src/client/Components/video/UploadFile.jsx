import React, { Component }from 'react';
import S3 from 'react-s3';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UploadFileCSS from '../../styled/common/UploadFile';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';
import SubmitButton from '../../styled/common/SubmitButton';

// needed for S3 processing
const { 
	REACT_APP_S3_BUCKET_NAME,
	REACT_APP_S3_REGION, 
	REACT_APP_S3_ACCESS_KEY_ID, 
	REACT_APP_S3_SECRET_ACCESS_KEY 
} = process.env

const config = {
	bucketName: REACT_APP_S3_BUCKET_NAME,
	dirName: 'videos',
	region: REACT_APP_S3_REGION,
	accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
	secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
}

export default class UploadFile extends Component {
	constructor() {
		super()
		
		this.state = {
			file: '',
			title: '',
		}
	}

	onDrop(file){
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
		S3.uploadFile(this.state.file, config)
			.then(res => axios.post('/api/video',{
				title: this.state.title,
				link: res.location
			}).then(this.setState({title: ''})))
			.catch(err => console.log(err))
	}

	render() {
		
		return (

			<UploadFileCSS>
				<Dropzone maxSize={100000000} onDrop={(file) => this.onDrop(file)}>
           			<p>Try dropping some files here, or click to select files to upload.</p>
          		</Dropzone>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Video Title</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="text"
							name="title"
							placeholder="Video Title"
							value={this.state.title}
							onChange={ ( e ) => this.updateTitle( e.target.value ) }
						/>
					</InputGroupInput>
				</InputGroupBody>
				

				<SubmitButton onClick={() => { this.uploadFile() }}>
					Upload File
				</SubmitButton>
			</UploadFileCSS>
		)
	}
}