import * as React from 'react';
import styled from 'styled-components';
import { FlowChartWithState } from '@gonzalo10/react-diagrams/';
import { Page } from './Page';
import { chartSimple } from './chartSimple';
import pythonLogo from '../../python.png';

const BoxStyleWrapper = styled.div`
	padding: 15px;
	margin: 10px;
	font-size: 12px;
	text-align: center;
`;

export const NodeCustom = ({ node }) => {
	let name;
	let boxTitle;
	if (node.properties.payload.name) {
		name = node.properties.payload.name;
		name = name.split('-');
		name = name[name.length - 1];
	}
	if (name) {
		boxTitle = name;
	} else {
		boxTitle = node.type.split('-')[1] || node.type;
	}
	return (
		<BoxStyleWrapper>
			<img
				alt={'python'}
				style={{ width: 30, position: 'absolute', left: 10, top: 10 }}
				src={pythonLogo}
			/>
			<div>{boxTitle}</div>
		</BoxStyleWrapper>
	);
};

export const CustomNodeInnerDemo = () => {
	return (
		<Page>
			<FlowChartWithState
				initialValue={chartSimple}
				Components={{
					NodeInner: NodeCustom,
				}}
			/>
		</Page>
	);
};
