import React, { Component } from 'react';
import UploadedVideos from './UploadedVideos';
import CardBody from '../../styled/common/card/body';
import UploadFile from './UploadFile';

export default class Control extends Component {
	constructor() {
		super();
				
		this.state = {
			videos: [
				{	
					id: 1,
					title: '24/7 gaming videos',
					link: 'https://stream-dream.s3.amazonaws.com/videos/IMG_6235.JPG'
				},
				{	
					id: 2,
					title: '10 Most VIEW Gaming Videos on Youtube',
					link: 'https://stream-dream.s3.amazonaws.com/videos/IMG_6234.JPG'
				}
			]
		}

	}

	render() {
		return (
			
			<div>
				<CardBody>	
					{this.state.videos.map( video => (
						<div key={video.id}>
							<UploadedVideos 
								id={video.id} 
								title={video.title} 
								link={video.link}
							/>
						</div>
					))}
				</CardBody>
				<UploadFile />
			</div>
		)
	}
}