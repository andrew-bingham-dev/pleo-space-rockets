import React, { useState } from 'react';
import { Badge, Box, Image, SimpleGrid, Text, Flex } from '@chakra-ui/core';
import { format as timeAgo } from 'timeago.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useSpaceXPaginated } from '../utils/use-space-x';
import { formatDate } from '../utils/format-date';
import Error from './error';
import Breadcrumbs from './breadcrumbs';
import LoadMoreButton from './load-more-button';
import FavouriteButton from './favourite-button';
import FavouritesDrawer from './favourites-drawer';
import FilterBar from './filter-bar';

const PAGE_SIZE = 12;

export default function Launches() {
	const [filterOption, setFilterOption] = useState('1'); // 1: All, 2: Successful, 3: Failed
	const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
		'/launches/past',
		{
			limit: PAGE_SIZE,
			order: 'desc',
			sort: 'launch_date_utc',
		}
	);

	return (
		<div>
			<FavouritesDrawer type='launches' data={data} />
			<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Launches' }]} />
			<FilterBar
				filterOption={filterOption}
				setFilterOption={setFilterOption}
				option1='All'
				option2='Successful'
				option3='Failed'
			/>
			<SimpleGrid m={[2, null, 6]} minChildWidth='350px' spacing='4'>
				{error && <Error />}
				{data &&
					data
						.flat()
						.map(launch =>
							filterOption === '1' ? (
								<LaunchItem launch={launch} key={launch.flight_number} />
							) : filterOption === '2' && launch.launch_success ? (
								<LaunchItem launch={launch} key={launch.flight_number} />
							) : filterOption === '3' && !launch.launch_success ? (
								<LaunchItem launch={launch} key={launch.flight_number} />
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

export function LaunchItem({ launch }) {
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.025 }}
		>
			<Box
				as={Link}
				to={`/launches/${launch.flight_number.toString()}`}
				boxShadow='md'
				borderWidth='1px'
				rounded='lg'
				overflow='hidden'
				position='relative'
			>
				<Image
					src={
						launch.links.flickr_images[0]?.replace('_o.jpg', '_z.jpg') ??
						launch.links.mission_patch_small
					}
					alt={`${launch.mission_name} launch`}
					height={['200px', null, '300px']}
					width='100%'
					objectFit='cover'
					objectPosition='bottom'
				/>

				<Image
					position='absolute'
					top='5'
					right='5'
					src={launch.links.mission_patch_small}
					height='75px'
					objectFit='contain'
					objectPosition='bottom'
				/>

				<Box p='6'>
					<Box d='flex' alignItems='baseline'>
						{launch.launch_success ? (
							<Badge px='2' variant='solid' variantColor='green'>
								Successful
							</Badge>
						) : (
							<Badge px='2' variant='solid' variantColor='red'>
								Failed
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
							{launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
						</Box>
					</Box>

					<Flex>
						<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
							{launch.mission_name}
						</Box>
						<Box ml='auto'>
							<FavouriteButton type='launch' id={launch.flight_number} />
						</Box>
					</Flex>

					<Flex>
						<Text fontSize='sm'>{formatDate(launch.launch_date_utc)} </Text>
						<Text color='gray.500' ml='2' fontSize='sm'>
							{timeAgo(launch.launch_date_utc)}
						</Text>
					</Flex>
				</Box>
			</Box>
		</motion.div>
	);
}
