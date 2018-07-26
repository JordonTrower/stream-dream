import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import Card from '../../styled/common/card/card';
import CardBody from '../../styled/common/card/body';

const GamesViewOneDiv = styled.div``;

// gameTitle = gameTitle.length - 2;

const text = `here's the games!`;

export default class GamesView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameVideos: []
		};
		this.getVideosByGameTitle = this.getVideosByGameTitle.bind(this);
	}

	componentDidMount() {
		this.getVideosByGameTitle();
	}

	getVideosByGameTitle() {
		const propsGameId = this.props.match.params.game_id;
		axios
			.get(
				`${
					process.env.REACT_APP_API_LOCATION
				}game_videos/${propsGameId}`
			)
			.then(res => {
				this.setState({
					gameVideos: res.data
				});
			});
	}

	render() {
		console.log(this.state);
		return (
			<GamesViewOneDiv>
				<p>{text}</p>
				{/* <p>{gameTitle}</p> */}
				<CardBody>
					{this.state.gameVideos.map(game => (
						<Link to={{ pathname: `/video/${game.id}` }}>
							<Card key={game.id}>
								<video height="100%" width="100%" muted>
									<source src={game.link} alt={game.title} />
								</video>
							</Card>
						</Link>
					))}
				</CardBody>
			</GamesViewOneDiv>
		);
	}
}

GamesView.propTypes = {
	match: propTypes.shape({
		params: propTypes.shape({
			game_id: propTypes.string
		})
	}).isRequired
};
