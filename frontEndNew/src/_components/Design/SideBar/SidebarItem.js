import * as React from 'react';
import styled from 'styled-components';
import { REACT_FLOW_CHART } from '@gonzalo10/react-diagrams/';
import TreeMenu from '../TreeMenu/TreeMenu';
const Outer = styled.div`
	padding: 5px 10px;
	margin-bottom: 5px;
	font-size: 14px;
	color: #b43539;
	background: white;
	border: 1px solid #b43539
	cursor: move;
	:hover {
		background: #b43539;
		color: white;
	  }
`;
const Outer2 = styled.div`
	padding: 5px 10px;
	margin-bottom: 5px;
	font-size: 14px;
	color: white;
	background: #d38c8c;
	border: 1px solid #b43539
	cursor: move;
	:hover {
		background: #b43539;
		color: white;
	  }
`;

const treeData = {
	Data: {
		label: 'Data',
		nodes: {
			CSV: {
				label: 'CSV',
			},
			Kaggle: {
				label: 'Kaggle',
				payload: { type: 'data', ports: 'ports', properites: 'props' },
			},
		},
	},
	machienLearning: {
		label: 'machine learning',
	},
};

export const SidebarItem = ({ type, ports, properties, onClick }, props) => {
	if (type === 'Python Module' || type === 'Modules') {
		return (
			<Outer2 id={type} onClick={onClick} draggable={false}>
				{type}
			</Outer2>
		);
	}
	return <TreeMenu data={treeData} />;
	// return (
	// 	<Outer
	// 		id={type}
	// 		onClick={onClick}
	// 		draggable={true}
	// 		onDragStart={event => {
	// 			event.dataTransfer.setData(
	// 				REACT_FLOW_CHART,
	// 				JSON.stringify({ type, ports, properties })
	// 			);
	// 		}}>
	// 		{type}
	// 	</Outer>
	// );
};
