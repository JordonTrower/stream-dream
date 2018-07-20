// import { PersistGate } from 'redux-persist/lib/integration/react';
// import { Provider } from 'react-redux';

import React from 'react';
import Routes from './routes';
import Header from './Nav/Header';
import Sidebar from './Nav/Sidebar';

// import { persistor, store } from "../store";
// import LoadingView which will be passed as props to PersistGate

function App() {
	return (
		// <Provider store={store} >
		// 	<PersistGate 
		// 		/* loading={LoadingView} */ 
		// 		persistor={persistor}
		// 	>
		<div className="App">
			<Header />
			<Sidebar />
			<Routes />
		</div>
		// 	 </PersistGate> 
		// </Provider>
	);
}

export default App;
