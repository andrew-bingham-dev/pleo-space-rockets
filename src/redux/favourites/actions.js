import {
	FAVOURITES_ADD_LAUNCH,
	FAVOURITES_REMOVE_LAUNCH,
	FAVOURITES_ADD_LAUNCHPAD,
	FAVOURITES_REMOVE_LAUNCHPAD,
} from './constants';

export function addLaunch(launchId) {
	return {
		type: FAVOURITES_ADD_LAUNCH,
		payload: launchId,
	};
}

export function removeLaunch(launchId) {
	return {
		type: FAVOURITES_REMOVE_LAUNCH,
		payload: launchId,
	};
}

export function addLaunchPad(launchPadId) {
	return {
		type: FAVOURITES_ADD_LAUNCHPAD,
		payload: launchPadId,
	};
}

export function removeLaunchPad(launchPadId) {
	return {
		type: FAVOURITES_REMOVE_LAUNCHPAD,
		payload: launchPadId,
	};
}
