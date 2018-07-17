import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../styled/common/card'

export default function UploadedVideos (props) {
  
	return (
		<Card>
			<div><img src={props.link} alt="Game Preview"/></div>
			<div>{props.title}</div>
		</Card>
	  
	)
  
}

UploadedVideos.propTypes={
	// id: PropTypes.number.isRequired,
	link: PropTypes.string.isRequired, 
	title: PropTypes.string.isRequired
}