import {
	FAVOURITES_ADD_LAUNCH,
	FAVOURITES_REMOVE_LAUNCH,
	FAVOURITES_ADD_LAUNCHPAD,
	FAVOURITES_REMOVE_LAUNCHPAD,
} from './constants';

export function favouritesReducer(state = { launchPads: [], launches: [] }, action) {
	switch (action.type) {
		case FAVOURITES_ADD_LAUNCH:
			return state;
		case FAVOURITES_REMOVE_LAUNCH:
			return state;
		case FAVOURITES_ADD_LAUNCHPAD:
			return state;
		case FAVOURITES_REMOVE_LAUNCHPAD:
			return state;
		default:
			return state;
	}
}
