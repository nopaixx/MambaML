import * as React from 'react';
import styled from 'styled-components';
import { store } from '../../_helpers';
import { projectActions } from '../../_actions';

const PortDefaultOuter = styled.div`
	width: 12px;
	height: 12px;
	background: cornflowerblue;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const PortCustom = props => {
	const [isColsOpen, seOpenCols] = React.useState(false);
	const handleClick = e => {
		e.preventDefault();
		e.stopPropagation();
		seOpenCols(!isColsOpen);
		getResultsFromNode(props.node);
	};

	const getResultsFromNode = node => {
		const dataPreview = node.properties.payload.result;
		store.dispatch(projectActions.loadPortPreview(dataPreview));
	};
	return (
		<div
			style={{
				width: 20,
				height: 20,
				backgroundColor: 'white',
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<PortDefaultOuter onContextMenu={handleClick} />
		</div>
	);
};
