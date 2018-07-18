import React, { Component } from "react";
import propTypes from "prop-types";

import Swipeable from 'react-swipeable';
import CarouselContainer from "./CarouselContainer";
import CarouselWrapper from "./CarouselWrapper";
import CarouselSlot from "./CarouselSlot";



class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: 0,
			direction: 'next',
			sliding: false
		}
		this.autoScroll = this.autoScroll.bind(this);
	}

	doSliding = ( direction, position ) => {
		this.setState({
			sliding: true,
			direction,
			position
		})

		setTimeout(() => {
			this.setState({
				sliding: false
			})
		}, 50)
	}
	
	
	
	getOrder(itemIndex) {
		const { position } = this.state;
		const { children } = this.props;
		const numItems = children.length || 1;

		if (itemIndex - position < 0) {
			return numItems - Math.abs(itemIndex - position);
		}

		return itemIndex - position;
	}
    
    nextSlide = () => {
    	const { position } = this.state;
    	const { children } = this.props;
    	const numItems = children.length || 1;
		
    	this.doSliding('next', position === numItems -1 ? 0 : position + 1);
    }
	
	prevSlide = () => {
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
	}
}

Carousel.propTypes = {
	title: propTypes.string,
	children: propTypes.node
}

export default Carousel;

// carousel build instructions that I followed came from here
// https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca