import * as React from 'react';
import styled from 'styled-components';
import { store } from '../../../_helpers';
import { projectActions } from '../../../_actions';

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
		console.log("AL-", props);
		getResultsFromNode(props.node);
	};

	const getResultsFromNode = node => {
		console.log("AL-", node)
		let outPorts = Object.keys(node.ports).filter(portKey => {
			return node.ports[portKey].type === 'output';
		});
		const selectedNodeIndex = outPorts.indexOf(props.port.id);
		const dataPreview =
			node.properties.payload.result[`out${selectedNodeIndex}`];
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
