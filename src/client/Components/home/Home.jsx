import React, { Component } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Carousel from '../carousel/Carousel';

const HomeOneDiv = styled.div`
	background-color: #191B21;
	width: 100%;
	height: 100%;
	> ::-webkit-scrollbar {
		display: none;
	}
`;

const HomeLiveContainer = styled.div`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export default class Home extends Component {
	// constructor() {
	// super();
	// this.state = {
	// 	carouselItems: []
	// 	// liveItems: [],
	// }
	// }

	componentDidMount() {
		// axios.get(`${process.env.REACT_APP_API_LOCATION}/the_carousel_things`).then(res => {
		// 	this.setState({
		// 		carouselItems: res.data
		// 	});
		// });
		// axios.get(`` /* all the live things */).then(res => {
		// 	// this.setState({
		// 	// 	liveItems: res.data
		// 	// })
		// });
	}
	
	render() {

		const carouselItems2 = [{
			link: 'http://www.animalspot.net/wp-content/uploads/2012/05/Greater-White-Fronted-Goose-Images.jpg',
			title: 'goose1'
		},
		{
			link: 'https://myronathon.files.wordpress.com/2012/04/canada-goose-solo-flying.png',
			title: 'goose2'
		},
		{
			link : 'https://pmdvod.nationalgeographic.com/NG_Video_DEV/822/1022/goose_canada_480x360.jpg',
			title: 'goose3'
		},
		{
			link : 'http://4.bp.blogspot.com/-SM7-1JmoFWM/UgFNona2Z4I/AAAAAAAAAYg/1MRseI-VEHM/s1600/goose.jpg',
			title: 'goose4'
		}]

		return (
			<HomeOneDiv>
				<Carousel carouselItems={carouselItems2}/>
				<br/>
				<br/>
				<HomeLiveContainer>
					{carouselItems2.map((goose) => (
						<img key={`goose-${goose.title}`}style={{height: '10rem', width: '15rem', margin: '2rem'}} alt={goose.title} src={goose.link}/>
					)) }
				</HomeLiveContainer>
			</HomeOneDiv>
		);
	}
}