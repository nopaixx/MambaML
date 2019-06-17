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
	'first-level-node-1': {
		// key
		label: 'Node 1 at the first level',
		index: 0, // decide the rendering order on the same level
		nodes: {
			'second-level-node-1': {
				label: 'Node 1 at the second level',
				index: 0,
				nodes: {
					'third-level-node-1': {
						label: 'Node 1 at the third level',
						index: 0,
						nodes: {}, // you can remove the nodes property or leave it as an empty array
					},
				},
			},
		},
	},
	'first-level-node-2': {
		label: 'Node 2 at the first level',
		index: 1,
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
