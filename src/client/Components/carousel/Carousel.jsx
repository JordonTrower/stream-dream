import React from 'react';
import Slider from 'react-slick';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CarouselContainer = styled.div`
	background-color: #191b21;
	width: 100%;
`;

const CarouselSlot = styled.div`
	background-color: #09092b;
	margin: 0 auto;
`;

const CarouselSlotItem = styled.div`
	/* background-color: green; */
	background-size: cover;
	width: 35rem;
	height: 20em;
	margin: 0 auto;
`;
const CarouselActual = styled(Slider)`
	width: 92.5%;
	margin: 0 auto;

	> .slick-arrow:before {
		color: white;
	}

	> .slick-dots li button {
		position: relative;
		z-index: 5;
	}

	> .slick-dots li button:before {
		color: #fff;
		background-color: #21385e;
		border-radius: 1rem;
	}
`;
// ////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////// //
// create an array items you want to display on the Carousel component        //
// pass that array into the Carousel component as props named 'carouselItems' //
// ////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////// //

export default function Carousel(props) {
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
					props.carouselItems.map((item) => (
						<CarouselSlot key={item.id}>
							<CarouselSlotItem style={{backgroundImage: `url(${item.link})`}}>
								<Link to={{pathname: `/video/${item.id}`}} >
									<video height='100%' width='100%' muted>
										<source src={item.link} alt="Game Preview"/>
									</video>
								</Link>
							
							</CarouselSlotItem>
						</CarouselSlot>
					))
				}
			</CarouselActual>
		</CarouselContainer>
	);
}

Carousel.propTypes = {
	carouselItems: propTypes.arrayOf(propTypes.shape()).isRequired
};
