<<<<<<< HEAD:src/client/Components/carousel/Carousel.jsx
import React, { Component } from 'react';
import propTypes from 'prop-types';
=======
import React, { Component } from "react";
import propTypes from "prop-types";

import Swipeable from 'react-swipeable';
import CarouselContainer from "./CarouselContainer";
import CarouselWrapper from "./CarouselWrapper";
import CarouselSlot from "./CarouselSlot";

>>>>>>> master:src/client/styled/carousel/Carousel.jsx

import CarouselContainer from './CarouselContainer';
import CarouselWrapper from './CarouselWrapper';
import CarouselSlot from './CarouselSlot';

class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: 0,
			direction: 'next',
			sliding: false
		};
	}

	getOrder(itemIndex) {
		const { position } = this.state;
		const { children } = this.props;

		const numItems = children.length || 1;

		if (itemIndex - position < 0) {
			return numItems - Math.abs(itemIndex - position);
		}
<<<<<<< HEAD:src/client/Components/carousel/Carousel.jsx

		return itemIndex - position;
=======
		this.autoScroll = this.autoScroll.bind(this);
>>>>>>> master:src/client/styled/carousel/Carousel.jsx
	}

	doSliding(direction, position) {
		this.setState({
			sliding: true,
			direction,
			position
		});

		setTimeout(() => {
			this.setState({
				sliding: false
			});
		}, 50);
	}
<<<<<<< HEAD:src/client/Components/carousel/Carousel.jsx

	nextSlide() {
=======
	
	
	
	getOrder(itemIndex) {
>>>>>>> master:src/client/styled/carousel/Carousel.jsx
		const { position } = this.state;
		const { children } = this.props;
		const numItems = children.length || 1;

		this.doSliding('next', position === numItems - 1 ? 0 : position + 1);
	}

	prevSlide() {
		const { position } = this.state;
		const { children } = this.props;
		const numItems = children.length;

		this.doSliding('prev', position === 0 ? numItems - 1 : position - 1);
	}

	handleSwipe = (isNext) => {
		if (isNext) {
			this.nextSlide('next')
		} else {
			this.prevSlide('prev')
		}
	}

	autoScroll(){
		this.nextSlide('next')
	}

	render() {
<<<<<<< HEAD:src/client/Components/carousel/Carousel.jsx
		console.log(this.state.position);
		const { title, children } = this.props;
		return (
			<div>
				<h2>{title}</h2>
				<CarouselWrapper
					sliding={this.state.sliding}
					direction={this.state.direction}
				>
					<CarouselContainer>
						{children.map((child, index) => (
							<CarouselSlot
								key={index.id} // eslint-disable-line
								order={this.getOrder(index)}
							>
								{child.title}
							</CarouselSlot>
						))}
					</CarouselContainer>
				</CarouselWrapper>
				<button onClick={() => this.prevSlide('prev')}>PREV</button>
				<button onClick={() => this.nextSlide('next')}>NEXT</button>
			</div>
		);
=======

		const carousel1Div = {
			display: 'flex',
			flexDirection: 'row',
			height: 'fit-content'
		}

		const carouselButton = {
			backgroundColor: '#000000',
			color: 'black', 
			opacity: 0.2,
			height: '20rem',
			width: '2em'
		}
    	const { children } = this.props;
    	return (
    		<div style={carousel1Div}>
				<div 
					style={carouselButton} 
					onClick={ () => this.prevSlide('prev') }
				>prev</div>
				<Swipeable
					className="swipeable"
					trackMouse
					style={{
						touchAction: 'none',
						width: '100%'
					}}
					preventDefaultTouchmoveEvent
					onSwipedLeft={ () => this.handleSwipe(true) }
					onSwipedRight={ () => this.handleSwipe() }
				>
					<CarouselWrapper>
						<CarouselContainer
							sliding={ this.state.sliding }
							direction={ this.state.direction }
						>
							{ children.map((child, index) => (
								<CarouselSlot 
									key={index}
									order={this.getOrder(index)}
								>
									{child}
								</CarouselSlot>
							)) }
						</CarouselContainer>
					</CarouselWrapper>
				</Swipeable>
				<div 
					style={carouselButton} 
					onClick={ () => this.nextSlide('next') }
				>next</div>
                
    		</div>
    	)
>>>>>>> master:src/client/styled/carousel/Carousel.jsx
	}
}

Carousel.propTypes = {
	title: propTypes.string,
	children: propTypes.node
};

Carousel.defaultProps = {
	title: '',
	children: [
		{
			id: 1,
			title: 'eee'
		},
		{
			id: 2,
			title: 'aaa'
		},
		{
			id: 3,
			title: 'aaa'
		}
	]
};

export default Carousel;

// carousel build instructions that I followed came from here
// https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca
