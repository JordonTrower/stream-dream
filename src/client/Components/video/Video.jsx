import React, { Component } from 'react';
import axios from 'axios';
// import Videos from './Videos';
import Card from '../../styled/common/Card/Card'
import CardBody from '../../styled/common/Card/Body';
import UploadFile from './UploadFile';

export default class Game extends Component {
	constructor() {
		super();

		this.state = {
			videos: [],
		};

		this.loadVideos = this.loadVideos.bind(this)
	}

	componentDidMount(){
		this.loadVideos()
	}

	loadVideos(){
		axios.get('/api/videos')
			.then( results => {
				this.setState({ 
					videos: results.data,
				})
			})
			.catch(err => console.log(err))
	}

	deleteVideo(id, link) {
		const s3name = link.replace('https://stream-dream.s3.us-west-1.amazonaws.com/', '')
		axios.delete(`/api/s3video`,
			{
				params: { s3name }
			})
			.then(() => axios.delete(`/api/video/${id}`)
				.then(() => this.loadVideos()))
	}

	render() {
		return (
			
			<div>
				<CardBody>	
					{this.state.videos.map( video => (
						<div key={video.id}>
							<Card>
								{/* <div><img height='100%' width='100%' src={props.link} alt="Game Preview"/></div> */}
								<div>
									<video height='100%' width='100%' muted>
										<source  src={video.link} alt="Game Preview"/>
									</video>
								</div>
								<div>{video.title}</div>
								<button>Edit</button>
								<button onClick={() => this.deleteVideo(video.id, video.link)}>Delete</button>
							</Card>

						</div>
					))}
				</CardBody>
				<UploadFile 
					loadVideos={this.loadVideos}
				/>
			</div>
		)
	}
}
