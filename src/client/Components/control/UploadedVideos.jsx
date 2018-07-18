import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../styled/common/card/card'

export default function UploadedVideos (props) {
  
	return (
		<Card>
			<div><img height='100%' width='100%' src={props.link} alt="Game Preview"/></div>
			<div>{props.title}</div>
		</Card>
	  
	)
  
}

UploadedVideos.propTypes={
	link: PropTypes.string.isRequired, 
	title: PropTypes.string.isRequired
}