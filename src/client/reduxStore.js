import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import sessionReducer from "./middlwares/redux/reducers/sessionReducer";

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2 // see "Merge Process" section from https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975 for details.
};

const pReducer = persistReducer( persistConfig, sessionReducer );

/* eslint-disable no-underscore-dangle */
 export const store = createStore( // eslint-disable-line
	pReducer, /* preloadedState, */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

export const persistor = persistStore(store)