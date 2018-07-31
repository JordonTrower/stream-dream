import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import Card from '../../styled/common/card/card';
import CardBody from '../../styled/common/card/body';

const GamesViewOneDiv = styled.div``;

export default class GamesView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameVideos: []
		};
		this.getVideosByGameId = this.getVideosByGameId.bind(this);
	}

	componentDidMount() {
		this.getVideosByGameId();
	}

	getVideosByGameId() {
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
		return (
			<GamesViewOneDiv>
				<CardBody>
					{this.state.gameVideos.map(game => (
						<Link to={{ pathname: `/video/${game.id}` }}>
							<Card key={game.id}>
								<video height="100%" width="100%" muted>
									<source src={game.link} alt={game.title} />
								</video>
								<p>{game.title}</p>
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
