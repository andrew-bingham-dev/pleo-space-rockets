import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Tooltip } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import {
	addLaunch,
	addLaunchPad,
	removeLaunch,
	removeLaunchPad,
} from '../redux/favourites/actions';

export default function FavouriteButton({ type, id }) {
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState(false);
	const launches = useSelector(state => state.favourites.launches);
	const launchPads = useSelector(state => state.favourites.launchPads);

	// convert id into a string
	id = String(id);

	// Check if item has already been favourited or not
	// Returns true or false
	const isFavourite = function () {
		if (type === 'launch') {
			return launches.includes(id);
		}
		if (type === 'launch-pad') {
			return launchPads.includes(id);
		}
		return null;
	};

	// Handle what happens when a user clicks the favourite star icon
	function handleClick(e) {
		e.preventDefault();

		console.log('isfav: ', isFavourite());

		if (type === 'launch') {
			if (isFavourite()) {
				dispatch(removeLaunch(id));
			} else {
				dispatch(addLaunch(id));
			}
		}

		if (type === 'launch-pad') {
			if (isFavourite()) {
				dispatch(removeLaunchPad(id));
			} else {
				dispatch(addLaunchPad(id));
			}
		}

		isActive ? setIsActive(false) : setIsActive(true);
		console.log('type: ', type);
		console.log('id: ', id);
	}

	return (
		<Box
			color='yellow.400'
			rounded='lg'
			bg='rgba(0,0,0,0.4)'
			p='2'
			onClick={handleClick}
			zIndex='1000'
			fontSize='15px'
			maxW='39px'
		>
			<Tooltip label='Add item to favourites'>
				<Box opacity='1'>
					<FontAwesomeIcon
						icon={isFavourite() ? faStar : farStar}
						size='lg'
						opacity='1'
					/>
				</Box>
			</Tooltip>
		</Box>
	);
}
