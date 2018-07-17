import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home'

export default (
	<Switch>
		<Route path = "/" component = { Home } exact />
	</Switch>
)