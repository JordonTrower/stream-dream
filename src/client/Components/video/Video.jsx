import React, { Component } from 'react';
import axios from 'axios';
import GoX from 'react-icons/lib/go/x';
import styled from 'styled-components';
import ButtonGroup from '../../styled/common/ButtonGroup';
import Carousel from '../carousel/Carousel';
import Card from '../../styled/common/Card/Card';
import CardBody from '../../styled/common/Card/Body';
import CancelButton from '../../styled/common/CancelButton';
import DeleteButton from '../../styled/common/DeleteButton';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';
import SubmitButton from '../../styled/common/SubmitButton'
import UploadFile from './UploadFile';

const MainDiv = styled.div`
	background-color: #191B21;
	width: 100%;
	height: 100%;
	> ::-webkit-scrollbar {
		display: none;
	}
`;

export default class Game extends Component {
	constructor() {
		super();

		this.state = {
			videos: [],
			carouselItems: [],
			editingCardId: 0,
			title: '',
		};

		this.loadVideos = this.loadVideos.bind(this);
	}

	componentDidMount() {
		this.loadVideos();
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

	loadVideos(){
		axios.get('/api/videos')
			.then( results => {
				this.setState({ 
					videos: results.data,
				})
			}).then(axios.get('/api/carouselVideos')
				.then( carResults => {
					this.setState({
						carouselItems: carResults.data
					})
				}))
			.catch(err => console.log(err))
	}

	cancelEdit(){
		this.setState({ 
			editingCardId: 0,
			title: ''
		})
	}

	editTitle(id, title){
		this.setState({ 
			editingCardId: id,
			title 
		})
	}

	saveEdit(){
		axios.put(`/api/video/`,{
			id: this.state.editingCardId,
			title: this.state.title,
		})
			.then(() => this.loadVideos())
			.then(() => this.cancelEdit())
	}

	updateTitle(val){
		this.setState({
			title: val,
		})
	}

	render() {

		return (
			
			<MainDiv>
				<Carousel 
					carouselItems = {this.state.carouselItems}
				/>

				<CardBody>	
					{this.state.videos.map( video => (
						<div key={video.id}>
							<Card>
								{/* <div><img height='100%' width='100%' src={props.link} alt="Game Preview"/></div> */}
								<div>
									<video height="100%" width="100%" muted>
										<source
											src={video.link}
											alt="Game Preview"
										/>
									</video>
								</div>
								{
									this.state.editingCardId === video.id ? (
										<div>
											<InputGroupBody>
												<InputGroupAppend>
													<p>Video Title</p>
												</InputGroupAppend>

												<InputGroupInput>
													<input type="text" 
														value={this.state.title}
														onChange={ ( e ) => this.updateTitle( e.target.value ) }/>
												</InputGroupInput>

											</InputGroupBody>
											<ButtonGroup>
												<SubmitButton type="button" onClick={() => this.saveEdit()}>Save</SubmitButton>
												<CancelButton>
													<GoX color="red" size="35" type="button" onClick={() => { this.cancelEdit() }}/>
												</CancelButton>
											</ButtonGroup>
										</div>
									)
										:
										(
											<ButtonGroup>
												<SubmitButton type="button" onClick={() => this.editTitle(video.id, video.title)}>Edit</SubmitButton>
												<DeleteButton onClick={() => this.deleteVideo(video.id, video.link)}>Delete</DeleteButton>
											</ButtonGroup>
										)
								}
								
								
								
							</Card>
						</div>
					))}
				</CardBody>
				<UploadFile 
					loadVideos={this.loadVideos}
				/>
			</MainDiv>
		)
	}
}
