import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './home/Home';
import Control from './control/Control';
import Body from '../styled/common/Body';

export default withRouter(props => (
	<Body rightSidebar={props.location.pathname === '/Control'}>
		{console.log(props)}
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/control" component={Control} />
		</Switch>
	</Body>
));
