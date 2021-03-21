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
} from '@chakra-ui/core';

import { LaunchItem } from './launches';
import { LaunchPadItem } from './launch-pads';

export default function FavouritesDrawer({ type, data }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen}>Open</Button>
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
						<LaunchItem launch={launch} key={launch.flight_number} />
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
						<LaunchPadItem launchPad={launchPad} key={launchPad.site_id} />
					) : null;
				})}
		</>
	);
}
