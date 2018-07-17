import React, { Component } from 'react';
import UploadedVideos from './UploadedVideos';
import CardBody from '../../styled/common/cardbody'

export default class Control extends Component {
	constructor() {
		super();
				
		this.state = {
			videos: [
				{	
					id: 1,
					title: '24/7 gaming videos',
					link: 'https://youtu.be/GUJ620-6kP4'
				},
				{	
					id: 2,
					title: '10 Most VIEW Gaming Videos on Youtube',
					link: 'https://youtu.be/PndF9Xy-cs0'
				}
			]
		}

	}

	render() {
		return (
			<div>
				<h1>Control</h1>
				<CardBody>	
					{this.state.videos.map( video => (
						<UploadedVideos 
							id={video.id} 
							title={video.title} 
							link={video.link}
						/>
					))}
				</CardBody>
			</div>
		)
	}
}