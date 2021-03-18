import React, { useState } from 'react';
import { Box, Tooltip } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

export default function FavouriteButton() {
	const [isActive, setIsActive] = useState(false);

	function handleClick(e) {
		e.preventDefault();
		isActive ? setIsActive(false) : setIsActive(true);
	}

	return (
		<Box
			color='yellow.400'
			rounded='lg'
			bg='rgba(0,0,0,0.4)'
			p='2'
			onClick={handleClick}
			zIndex='1000'
		>
			<Tooltip label='Add item to favourites'>
				<Box opacity='1'>
					<FontAwesomeIcon icon={isActive ? faStar : farStar} size='lg' opacity='1' />
				</Box>
			</Tooltip>
		</Box>
	);
}
