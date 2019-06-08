import * as React from 'react';
import styled from 'styled-components';
import { FlowChartWithState } from '@mrblenny/react-flow-chart/';
import { Page } from './Page';
import { chartSimple } from './chartSimple';

const Outer = styled.div`
	padding: 3px;
`;

const Input = styled.input`
	padding: 5px;
	border: 1px solid cornflowerblue;
	width: 100%;
`;

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */

const dataSet = specifics => {
	return (
		<Outer id={'mambaMl'} onClick={e => console.log(e.target)}>
			<p>Use Node inner to customise the content of the node</p>
			<p>{specifics}</p>
		</Outer>
	);
};

export const NodeInnerCustom = ({ node }) => {
	if (node.type === 'output-only') {
		return (
			<Outer id={'mambaMl'} onClick={e => console.log(e.target)}>
				<p>Use Node inner to customise the content of the node</p>
			</Outer>
		);
	} else if (node.type === 'dataset-1') {
		return dataSet('csv');
	} else if (node.type === 'dataset-2') {
		return dataSet('xml');
	} else {
		return (
			<Outer>
				<p>Add custom displays for each node.type</p>
				<p>You may need to stop event propagation so your forms work.</p>
				<br />
				<Input
					placeholder="Add forms etc if required"
					onClick={e => console.log(e)}
					onChange={e => console.log(e.target.value)}
					onMouseUp={e => e.stopPropagation()}
					onMouseDown={e => e.stopPropagation()}
				/>
			</Outer>
		);
	}
};

export const CustomNodeInnerDemo = () => {
	return (
		<Page>
			<FlowChartWithState
				initialValue={chartSimple}
				Components={{
					NodeInner: NodeInnerCustom,
				}}
			/>
		</Page>
	);
};
