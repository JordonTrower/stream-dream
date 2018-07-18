import React, { Component } from 'react';
import propTypes from 'prop-types';

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

		return itemIndex - position;
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

	nextSlide() {
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

	render() {
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
