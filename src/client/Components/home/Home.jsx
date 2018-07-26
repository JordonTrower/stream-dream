import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from "../../styled/common/card/card";
import CardBody from "../../styled/common/card/body";
import Carousel from '../carousel/Carousel';

const HomeOneDiv = styled.div`
	background-color: #191B21;
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
	background-color: #191B21;
	height: 17rem;
	width: 13rem;
	img{
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
			carouselItems: [],
			games: []
		}
		this.getGames = this.getGames.bind(this);
	}

	componentDidMount() {
		this.getGames()
	}

	getGames(){
		axios.get(`${process.env.REACT_APP_API_LOCATION}games`)
			.then(res => {
				console.log(this.state)
				console.log(res);
			})
	}
	
	render() {

		const carouselItems2 = [
			{
				link: 'https://cdn.shopify.com/s/files/1/0417/0233/products/destiny2.jpg?v=1495132332',
				title: 'Destiny 2'
			},
			{
				link: 'http://assets1.ignimgs.com/2015/05/27/rocket-league-posterjpg-ef2765.jpg',
				title: 'Rocket League'
			},
			{
				link : 'http://www.newgamesbox.net/wp-content/uploads/2017/08/FORTNITE-Free-Download.jpg',
				title: 'Fortnite'
			},
			{
				link : 'http://hdphonewallpapers.com/content/K64vyRLY97LZgKQK25ih55na5OMkI9R8bV3uo432bzYWGjl3S4Te54rORc1kEkQA.png',
				title: 'League of Legends'
			},
			{
				link: 'http://orig00.deviantart.net/cd70/f/2014/184/0/8/super_smash_bros__lockscreen_by_ciezure-d7p24ys.png',
				title: 'Super Smash Bros'
			},
			{
				link: 'http://imgc.allpostersimages.com/images/P-473-488-90/96/9683/3PTC500Z/posters/overwatch-game-cover.jpg',
				title: 'Overwatch'
			},
			{
				link: 'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/635177-176831.jpg',
				title: 'Breath of The Wild'
			},
			{
				link: 'http://news.toyark.com/wp-content/uploads/sites/4/2014/09/NECA-18-Inch-Master-Chief-01.jpg',
				title: 'Halo'
			},
			{
				link: 'https://cdn.wallpapersafari.com/9/31/kQMIvN.jpg',
				title: 'Other'
			}
		]

		return (
			<HomeOneDiv>
				<Carousel carouselItems={carouselItems2}/>
				<br/>
				<br/>
				<HomeGamesContainer>
					<CardBody>
						{ carouselItems2.map((item) => (
							<Card key={item.title} >
								<GameTitle>{item.title}</GameTitle>
								<GameImageContainer>
									<Link 
										to={{pathname: `/games/${item.title}`}}
									>
										<img alt={item.title} src={item.link}/>
									</Link>
								</GameImageContainer>
							</Card>
						)) }
					</CardBody>
				</HomeGamesContainer>
			</HomeOneDiv>
		);
	}
}