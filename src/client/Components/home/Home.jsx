import React, { Component } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
import Carousel from '../carousel/Carousel';

export default class Home extends Component {
	// constructor() {
	// 	super();
	// 	// this.state = {
	// 	// 	carouselItems: [],
	// 	// 	liveItems: [],
	// 	// }
	// }

	componentDidMount() {
		// axios.get(`` /* all the carousel things */).then(res => {
		// 	// this.setState({
		// 	// 	carouselItems: res.data
		// 	// })
		// });
		// axios.get(`` /* all the live things */).then(res => {
		// 	// this.setState({
		// 	// 	liveItems: res.data
		// 	// })
		// });
	}

	render() {
		return (
			<Carousel title="carousel-item">
				{/* this is where this.state.carouselItems will be rendered via a map */}

				{/* this is where the cards by catagories will be rendered by a map */}
			</Carousel>
		);
	}
}

// //carousel build instructions that I followed came from here
// //https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca
