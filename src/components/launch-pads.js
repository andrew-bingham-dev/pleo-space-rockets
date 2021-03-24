import React, { useState } from 'react';
import { Badge, Box, SimpleGrid, Text, Flex } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Error from './error';
import Breadcrumbs from './breadcrumbs';
import LoadMoreButton from './load-more-button';
import { useSpaceXPaginated } from '../utils/use-space-x';
import FavouriteButton from './favourite-button';
import FavouritesDrawer from './favourites-drawer';
import FilterBar from './filter-bar';

const PAGE_SIZE = 12;

export default function LaunchPads() {
	const [filterOption, setFilterOption] = useState('1'); // 1: All, 2: Successful, 3: Failed
	const { data, error, isValidating, size, setSize } = useSpaceXPaginated('/launchpads', {
		limit: PAGE_SIZE,
	});

	return (
		<div>
			<FavouritesDrawer type='launch-pads' data={data} />
			<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Launch Pads' }]} />
			<FilterBar
				filterOption={filterOption}
				setFilterOption={setFilterOption}
				option1='All'
				option2='Active'
				option3='Retired'
			/>
			<SimpleGrid m={[2, null, 6]} minChildWidth='350px' spacing='4'>
				{error && <Error />}
				{data &&
					data
						.flat()
						.map(launchPad =>
							filterOption === '1' ? (
								<LaunchPadItem launchPad={launchPad} key={launchPad.site_id} />
							) : filterOption === '2' && launchPad.status === 'active' ? (
								<LaunchPadItem launchPad={launchPad} key={launchPad.site_id} />
							) : filterOption === '3' && launchPad.status === 'retired' ? (
								<LaunchPadItem launchPad={launchPad} key={launchPad.site_id} />
							) : null
						)}
			</SimpleGrid>
			<LoadMoreButton
				loadMore={() => setSize(size + 1)}
				data={data}
				pageSize={PAGE_SIZE}
				isLoadingMore={isValidating}
			/>
		</div>
	);
}

export function LaunchPadItem({ launchPad }) {
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.025 }}
		>
			<Box
				as={Link}
				to={`/launch-pads/${launchPad.site_id}`}
				boxShadow='md'
				borderWidth='1px'
				rounded='lg'
				overflow='hidden'
				position='relative'
			>
				<Box p='6'>
					<Box d='flex' alignItems='baseline'>
						{launchPad.status === 'active' ? (
							<Badge px='2' variant='solid' variantColor='green'>
								Active
							</Badge>
						) : (
							<Badge px='2' variant='solid' variantColor='red'>
								Retired
							</Badge>
						)}
						<Box
							color='gray.500'
							fontWeight='semibold'
							letterSpacing='wide'
							fontSize='xs'
							textTransform='uppercase'
							ml='2'
						>
							{launchPad.attempted_launches} attempted &bull;{' '}
							{launchPad.successful_launches} succeeded
						</Box>
					</Box>
					<Flex>
						<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
							{launchPad.name}
						</Box>
						<Box ml='auto'>
							<FavouriteButton type='launch-pad' id={launchPad.site_id} />
						</Box>
					</Flex>
					<Text color='gray.500' fontSize='sm'>
						{launchPad.vehicles_launched.join(', ')}
					</Text>
				</Box>
			</Box>
		</motion.div>
	);
}
