import React from "react";
import Slider from "react-slick";
import styled from 'styled-components';

const CarouselContainer = styled.div`
    background-color: #191B21;
`;

const CarouselSlot = styled.div`
    background-color: #09092B;
    margin: 0 auto;
`;

const CarouselSlotItem = styled.div`
    background-color: green;
    width: 40rem;
    height: 20rem;
    margin: 0 auto;
`;
const CarouselActual = styled(Slider)`
    width: 70%;
    margin: 0 auto;
    > .slick-arrow:before {
        color: #21385E;
    }
`
// /////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////
// create an array items you want to display on the Carousel component        //
// pass that array into the Carousel component as props named 'carouselItems' //
// /////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

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
						<CarouselSlot
						>
							<CarouselSlotItem>{item}</CarouselSlotItem>
						</CarouselSlot>
					))
				}
			</CarouselActual>
		</CarouselContainer>
	);
}

