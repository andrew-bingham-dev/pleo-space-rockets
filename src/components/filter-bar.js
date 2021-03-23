import React from 'react';
import { Radio, RadioGroup, Flex } from '@chakra-ui/core';

export default function FilterBar({
	filterOption,
	setFilterOption,
	option1,
	option2,
	option3,
}) {
	return (
		<Flex p='1' justifyContent='center'>
			<RadioGroup
				isInline
				spacing='10'
				defaultValue={1}
				size='sm'
				onChange={e => setFilterOption(e.target.value)}
				value={filterOption}
			>
				<Radio value='1'>{option1}</Radio>
				<Radio value='2' variantColor='green'>
					{option2}
				</Radio>
				<Radio value='3' variantColor='red'>
					{option3}
				</Radio>
			</RadioGroup>
		</Flex>
	);
}
