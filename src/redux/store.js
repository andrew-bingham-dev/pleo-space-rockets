import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { favouritesReducer } from './favourites/reducers';
import { loadState, saveState } from './localStorage';

const rootReducer = combineReducers({
	favourites: favouritesReducer,
});

const initialState = loadState();
const store = createStore(rootReducer, initialState, composeWithDevTools());

store.subscribe(() => {
	saveState({
		favourites: store.getState().favourites,
	});
});

export default store;
