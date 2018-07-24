import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {

};

const SET_USER_PROPS = 'SET_USER_PROPS';

function sessionReducer(state = initialState, action){
	switch(action.type){
		case SET_USER_PROPS:
			return Object.assign({}, state, {user: action.payload});
		default: return state;
	}
}

export function setUserProps(user) {
	return {
		type: SET_USER_PROPS,
		payload: user
	};
}

const persistConfig = {
	key: 'root',
	storage
}

export default persistReducer(persistConfig, sessionReducer);