import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import React from 'react';
import Routes from './routes';
import Header from './nav/Header';
import Sidebar from './nav/Sidebar';

import { persistor, store } from '../reduxStore';
import LoadingView from './loadingView/LoadingView';

const App = () => (
	<Provider store={store}>
		<PersistGate loading={LoadingView} persistor={persistor}>
			<div className="App">
				<Header />
				<Sidebar />
				<Routes />
			</div>
		</PersistGate>
	</Provider>
);

export default App;
