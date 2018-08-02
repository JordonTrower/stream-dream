import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from '../../styled/common/card/card';
import CardBody from '../../styled/common/card/body';
import Carousel from '../carousel/Carousel';

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const HomeOneDiv = styled.div`
	background-color: #191b21;
	width: 100%;
	height: 100%;
	> ::-webkit-scrollbar {
		display: none;
	}
`;

const HomeGamesContainer = styled.div`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	flex-direction: row;
`;

const GameImageContainer = styled.div`
	background-color: #191b21;
	height: 17rem;
	width: 13rem;
	img {
		max-height: 100%;
		max-width: 100%;
		cursor: pointer;
	}
`;

const GameTitle = styled.div`
	font-size: 1.5rem;
`;

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			games: [],
			carouselVideos: []
		};
		this.getGames = this.getGames.bind(this);
		this.getCarouselVideos = this.getCarouselVideos.bind(this);
	}

	componentDidMount() {
		this.getGames();
		this.getCarouselVideos();
	}

	getCarouselVideos() {
		axios
			.get(`${process.env.REACT_APP_API_LOCATION}homeCarouselVideos`)
			.then(res => {
				this.setState({
					carouselVideos: res.data
				});
			});
	}

	getGames() {
		axios.get(`${process.env.REACT_APP_API_LOCATION}games`).then(res => {
			this.setState({
				games: res.data
			});
		});
	}

	render() {
		return (
			<HomeOneDiv>
				<Carousel carouselItems={this.state.carouselVideos} />
				<br />
				<br />
				<HomeGamesContainer>
					<CardBody>
						{this.state.games.map(game => (
							<StyledLink
								key={game.title}
								to={{
									pathname: `${
										process.env.REACT_APP_NGINX_LOCATION
									}/games/${game.id}`
								}}
							>
								<Card>
									<GameTitle>{game.title}</GameTitle>
									<GameImageContainer>
										<img
											alt={game.title}
											src={game.picture}
										/>
									</GameImageContainer>
								</Card>
							</StyledLink>
						))}
					</CardBody>
				</HomeGamesContainer>
			</HomeOneDiv>
		);
	}
}
