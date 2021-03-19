import {
	FAVOURITES_ADD_LAUNCH,
	FAVOURITES_REMOVE_LAUNCH,
	FAVOURITES_ADD_LAUNCHPAD,
	FAVOURITES_REMOVE_LAUNCHPAD,
} from './constants';

export function favouritesReducer(state = { launchPads: [], launches: [] }, action) {
	switch (action.type) {
		case FAVOURITES_ADD_LAUNCH:
			return {
				launchPads: [...state.launchPads],
				launches: [...state.launches, action.payload],
			};
		case FAVOURITES_REMOVE_LAUNCH:
			const filteredLaunches = state.launches.filter(item => {
				return item !== action.payload;
			});
			return { launchPads: [...state.launchPads], launches: [...filteredLaunches] };
		case FAVOURITES_ADD_LAUNCHPAD:
			return {
				launches: [...state.launches],
				launchPads: [...state.launchPads, action.payload],
			};
		case FAVOURITES_REMOVE_LAUNCHPAD:
			const filteredLaunchPads = state.launchPads.filter(item => {
				return item !== action.payload;
			});
			return { launches: [...state.launches], launchPads: [...filteredLaunchPads] };
		default:
			return state;
	}
}
