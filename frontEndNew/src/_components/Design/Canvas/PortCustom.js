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
const DropdownMenu = styled.div`
	background: white;
	width: 80px;
	position: absolute;
	border-radius: 10px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;
const DropdownItem = styled.div`
	padding: 10px;
	borderbottom: '1px solid black';
	border-radius: 10px;
	&:hover {
		background-color: #b43539;
		color: white;
	}
`;

export const PortCustom = props => {
	const [isColsOpen, seOpenCols] = React.useState(false);

	const handleClickDisplayData = e => {
		e.preventDefault();
		e.stopPropagation();
		seOpenCols(!isColsOpen);
		console.log("AL-", props);
		getResultsFromNode(props.node);
	};
	const handleClick = e => {
		e.preventDefault();
		e.stopPropagation();
		seOpenCols(!isColsOpen);
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
	const serializeProject = () => {
		console.log(props);
		store.dispatch(projectActions.serializeProjectModal(true));
	};
	return (
		<>
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
			{isColsOpen ? (
				<DropdownMenu>
					<DropdownItem onClick={handleClickDisplayData}>Data</DropdownItem>
					<DropdownItem onClick={serializeProject}>Serialize</DropdownItem>
				</DropdownMenu>
			) : null}
		</>
	);
};
