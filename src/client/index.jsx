import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './reset.css';
import App from './Components/App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter >
		<App/>
	</BrowserRouter>
	, document.getElementById('root'));
// registerServiceWorker();
