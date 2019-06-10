import * as React from 'react';
import styled from 'styled-components';
import { REACT_FLOW_CHART } from '@mrblenny/react-flow-chart/';

const Outer = styled.div`
	padding: 20px 30px;
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

export const SidebarItem = ({ type, ports, properties }) => {
	return (
		<Outer
			onClick={e => console.log(type, properties)}
			draggable={true}
			onDragStart={event => {
				event.dataTransfer.setData(
					REACT_FLOW_CHART,
					JSON.stringify({ type, ports, properties })
				);
			}}>
			{type}
		</Outer>
	);
};
