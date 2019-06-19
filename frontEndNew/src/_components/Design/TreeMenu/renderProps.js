import React from 'react';
import { REACT_FLOW_CHART } from '@gonzalo10/react-diagrams/';
import styled from 'styled-components';

const DEFAULT_PADDING = 0.75;
const LEVEL_SPACE = 1.75;
const ICON_SIZE = 2;
const ToggleIcon = ({ on }) => (
	<div
		role="img"
		aria-label="Toggle"
		style={{
			width: `${ICON_SIZE}rem`,
			height: `${ICON_SIZE}rem`,
			textAlign: 'center',
			lineHeight: `${ICON_SIZE}rem`,
		}}>
		{on ? '-' : '+'}
	</div>
);
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

const renderItem = ({
	hasNodes = false,
	isOpen = false,
	level = 0,
	onClick,
	toggleNode,
	active,
	focused,
	key,
	payload,
	label = 'unknown',
}) => (
	<li
		style={{
			padding: ` .75rem  1rem  .75rem ${DEFAULT_PADDING +
				ICON_SIZE * (hasNodes ? 0 : 1) +
				level * LEVEL_SPACE}rem`,
			cursor: 'pointer',
			color: active ? 'white' : '#333',
			background: active ? '#179ed3' : 'none',
			borderBottom: active ? 'none' : '1px solid #ccc',
			boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
			zIndex: focused ? 999 : 'unset',
			position: 'relative',
		}}
		role="button"
		aria-pressed={active}>
		{!hasNodes && (
			<Outer
				key={key}
				onClick={onClick}
				draggable={true}
				onDragStart={event => {
					const type = payload.type;
					const ports = payload.ports;
					const properties = payload.properties;
					event.dataTransfer.setData(
						REACT_FLOW_CHART,
						JSON.stringify({ type, ports, properties })
					);
				}}>
				{label}
			</Outer>
		)}
		{hasNodes && (
			<div
				style={{ display: 'inline-block' }}
				onClick={e => {
					hasNodes && toggleNode && toggleNode();
					e.stopPropagation();
				}}>
				<ToggleIcon on={isOpen} />
				{label}
			</div>
		)}
	</li>
);

export const defaultChildren = ({ search, items }) => {
	const onSearch = e => {
		const { value } = e.target;
		search && search(value);
	};
	console.log('items', items);
	return (
		<>
			{search && (
				<input
					style={{ padding: '1rem 1.5rem', border: 'none', width: '100%' }}
					aria-label="Type and search"
					type="search"
					placeholder="Type and search"
					onChange={onSearch}
				/>
			)}
			<ul
				style={{
					listStyleType: 'none',
					paddingLeft: 0,
					borderTop: '1px solid #ccc',
				}}>
				{items.map(renderItem)}
			</ul>
		</>
	);
};
