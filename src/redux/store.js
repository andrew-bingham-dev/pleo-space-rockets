import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { favouritesReducer } from './favourites/reducers';

const rootReducer = combineReducers({
	favourites: favouritesReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
