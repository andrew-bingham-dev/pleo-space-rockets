import React from 'react';
import { useSelector } from 'react-redux';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Box,
} from '@chakra-ui/core';

import { LaunchItem } from './launches';
import { LaunchPadItem } from './launch-pads';

export default function FavouritesDrawer({ type, data }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen} pos='absolute' right='1.5rem' top='90px'>Show Favourites</Button>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Favourite {type}</DrawerHeader>

					<DrawerBody overflowY='scroll'>
						{type === 'launches' ? <ListLaunches data={data} /> : null}
						{type === 'launch-pads' ? <ListLaunchPads data={data} /> : null}
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

function ListLaunches({ data }) {
	const launches = useSelector(state => state.favourites.launches);
	return (
		<>
			{data &&
				data.flat().map(launch => {
					return launches.includes(String(launch.flight_number)) ? (
						<Box bg='white' rounded='lg' my='2' border='1px solid' borderColor='gray.300'>
							<LaunchItem launch={launch} key={launch.flight_number} />
						</Box>
					) : null;
				})}
		</>
	);
}

function ListLaunchPads({ data }) {
	const launchPads = useSelector(state => state.favourites.launchPads);
	console.log('data: ', data);
	return (
		<>
			{data &&
				data.flat().map(launchPad => {
					return launchPads.includes(launchPad.site_id) ? (
						<Box bg='white' rounded='lg' my='2' border='1px solid' borderColor='gray.300'>
							<LaunchPadItem launchPad={launchPad} key={launchPad.site_id} />
						</Box>
					) : null;
				})}
		</>
	);
}
