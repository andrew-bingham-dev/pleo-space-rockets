import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { removeLaunchPad, removeLaunch } from '../redux/favourites/actions';
import { motion } from 'framer-motion';

export default function FavouritesDrawer({ type, data }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				onClick={onOpen}
				pos='absolute'
				right='1.5rem'
				top='90px'
				fontWeight='normal'
			>
				Show Favourites
			</Button>
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
						<motion.div whileHover={{ scale: 1.025 }}>
							<Box
								bg='white'
								rounded='lg'
								my='2'
								border='1px solid'
								borderColor='gray.300'
								key={launch.flight_number}
							>
								<DeleteItemButton type='launch' item={String(launch.flight_number)} />
								<LaunchItem launch={launch} />
							</Box>
						</motion.div>
					) : null;
				})}
		</>
	);
}

function ListLaunchPads({ data }) {
	const launchPads = useSelector(state => state.favourites.launchPads);
	return (
		<>
			{data &&
				data.flat().map(launchPad => {
					return launchPads.includes(launchPad.site_id) ? (
						<motion.div whileHover={{ scale: 1.025 }}>
							<Box
								bg='white'
								rounded='lg'
								my='2'
								border='1px solid'
								borderColor='gray.300'
								key={launchPad.site_id}
							>
								<DeleteItemButton type='launch-pad' item={launchPad.site_id} />
								<LaunchPadItem launchPad={launchPad} />
							</Box>
						</motion.div>
					) : null;
				})}
		</>
	);
}

function DeleteItemButton({ type, item }) {
	const dispatch = useDispatch();

	function handleClick() {
		if (type === 'launch-pad') {
			dispatch(removeLaunchPad(item));
		}
		if (type === 'launch') {
			dispatch(removeLaunch(item));
		}
	}

	return (
		<Button ml='auto' onClick={handleClick}>
			X
		</Button>
	);
}
