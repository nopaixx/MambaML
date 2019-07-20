import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

export const PortSelector = ({ inputColumns = [], setOption }) => {
	let inputPorts;
	if (inputColumns) {
		inputPorts = Object.keys(inputColumns);
	}
	return (
		<div style={{ justifyContent: 'center', display: 'flex' }}>
			<Dropdown
				options={inputPorts}
				name={'Input Port'}
				selectedOptions={option => setOption(option)}
			/>
		</div>
	);
};
