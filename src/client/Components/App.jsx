import React from 'react';
import Routes from './routes';
import Header from './nav/Header';
import Sidebar from './nav/Sidebar';

function App() {
	return (
		<div className="App">
			<Header />
			<Sidebar />
			<Routes />
		</div>
	);
}

export default App;
