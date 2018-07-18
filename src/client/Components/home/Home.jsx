import React from 'react';

export default () => (
	<div>
		<h1>HOME</h1>
	</div>
);

// import React, { Component } from "react";
// import axios from "axios";
// import PopularCarousel from "./popularCarousel/PopularCarousel";
// import styled from "styled-components";

// const StyledHome = styled.div`/* ... */`

// export default class Home extends Component {
//     constructor() {
//         super();
//         this.state = {
//             carouselItems: [],
//             liveItems: [],
//         }
//     }

//     componentDidMount() {
//         axios.get(``/* all the carousel things */).then(
//             res => {
//                 this.setState({
//                     carouselItems: res.data
//                 })
//             }
//         )
//         axios.get(``/* all the live things */).then(
//             res => {
//                 this.setState({
//                     liveItems: res.data
//                 })
//             }
//         )
//     }

//     render() {

//         return (
//             <StyledHome>
//                 <PopularCarousel
//                     title="carousel-item"
//                 >

//                 {/* this is where this.state.carouselItems will be rendered via a map */}
//                 </PopularCarousel>

//                 {/* this is where the cards by catagories will be rendered by a map */}
//             </StyledHome>
//         )
//     }
// }

// //carousel build instructions that I followed came from here
// //https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca
