import React, { Component } from 'react';
import axios from 'axios';
// import S3 from 'react-s3';
import Videos from './Videos';
import CardBody from '../../styled/common/card/body';
import UploadFile from '../../styled/common/UploadFile';

// needed for S3 processing
const { 
	REACT_APP_S3_BUCKET_NAME,
	// REACT_APP_S3_REGION, 
	// REACT_APP_S3_ACCESS_KEY_ID, 
	// REACT_APP_S3_SECRET_ACCESS_KEY 
} = process.env

// const config = {
// 	bucketName: REACT_APP_S3_BUCKET_NAME,
// 	dirName: 'videos',
// 	region: REACT_APP_S3_REGION,
// 	accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
// 	secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
// }

function deleteFile(id,fileName) {
	const cleanFileName = fileName.replace(`https://${REACT_APP_S3_BUCKET_NAME}.s3.amazonaws.com/videos/`, '');
	console.log(cleanFileName)
	// S3.deleteFile(cleanFileName, config)
	// 	.then( (res) => {
	// 		console.log(res)
	// 		axios.delete(`/api/video/${id}`)
	// 	} )
	// 	.catch(err => console.log(err))
	axios.delete(`/api/video/${id}`)
}


export default class Game extends Component {
	constructor() {
		super();

		this.state = {
			videos: [],
		};
	}

	componentDidMount(){
		axios.get('/api/videos')
			.then( results => {
				this.setState({ 
					videos: results.data,
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			
			<div>
				<CardBody>	
					{this.state.videos.map( video => (
						<div key={video.id}>
							<Videos 
								id={video.id} 
								title={video.title} 
								link={video.link}
								deleteFile={deleteFile}
							/>
						</div>
					))}
				</CardBody>
				<UploadFile />
			</div>
		)
	}
}
