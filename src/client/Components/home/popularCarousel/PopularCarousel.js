import React, { PropTypes, Component } from "react";

import CarouselContainer from "./CarouselContainer";
import CarouselWrapper from "./CarouselWrapper";
import CarouselSlot from "./CarouselSlot";
import styled from 'styled-components';

const CarouselSlot = styled.div`
    flex: 1 0 100%;
    flex-basis: 80%;
    margin-right: 20px;
    order: ${(props) => props.order}
`

class PopularCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0
        }
    }

    getOrder(itemIndex) {
        const { position } = this.state;
        const { children } = this.props;
        const numItems = children.length || 1;
        if (itemIndex = position < 0) {
            return numItems - Math.abs(itemIndex - position);
        }
        return itemIndex - position;
    }

    render() {
        const { title, children } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <CarouselWrapper>
                    <CarouselContainer>
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
                
            </div>
        )
    }
}

PopularCarousel.PropTypes = {
    title: PropTypes.string,
    children: Proptypes.node
}

export default PopularCarousel;

//carousel build instructions that I followed came from here
//https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca