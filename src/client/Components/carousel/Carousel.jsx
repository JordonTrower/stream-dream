import React from "react";
import Slider from "react-slick";
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

const CarouselContainer = styled.div`
    background-color: #191B21;
	width: 92%;
	z-index: 0;
	
`;

const CarouselSlot = styled.div`
    background-color: #09092B;
	margin: 0 auto;
	z-index: 0;
`;

const CarouselSlotItem = styled.div`
	cursor: pointer;
	background-size: cover;
    width: 35rem;
    height: 20em;
	margin: 0 auto;
	z-index: 0;
`;
const CarouselActual = styled(Slider)`
	z-index: 0;
    width: 92.5%;
    margin: 0 auto;
    > .slick-arrow:before {
        color: white;
    }
> .slick-dots li button:before {
	color: #FFF;
	background-color: #21385E;
	border-radius: 1rem;
}

`;
// ////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////// //
// create an array items you want to display on the Carousel component        //
// pass that array into the Carousel component as props named 'carouselItems' //
// ////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////// //

export default function Carousel(props){
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		centerMode: true,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true
	};
	return (
		<CarouselContainer>
			<CarouselActual {...settings}>
				{
					props.carouselItems.map((item) => ( // eslint-disable-line
						<CarouselSlot>
							{/* <Link> */}
							<CarouselSlotItem style={{backgroundImage: `url(${item.picture})`}}/>
							{/* </Link> */}
						</CarouselSlot>
					))
				}
			</CarouselActual>
		</CarouselContainer>
	);
}

