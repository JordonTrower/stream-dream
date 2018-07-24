import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../styled/common/card/card'

export default function Videos (props) {
  
	return (
		<Card>
			{/* <div><img height='100%' width='100%' src={props.link} alt="Game Preview"/></div> */}
			<div>
				<video height='100%' width='100%' muted>
					<source  src={props.link} alt="Game Preview"/>
				</video>
			</div>
			<div>{props.title}</div>
			<button>Edit</button>
			<button onClick={() => props.deleteFile(props.id, props.link)}>Delete</button>
		</Card>
	  
	)
}

Videos.propTypes={
	id: PropTypes.number.isRequired,
	link: PropTypes.string.isRequired, 
	title: PropTypes.string.isRequired,
	deleteFile: PropTypes.func.isRequired
}