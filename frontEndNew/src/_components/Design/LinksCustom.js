import React from 'react';
import { LinkDefault } from '@gonzalo10/react-diagrams/';

import styled from 'styled-components';

const Label = styled.div`
	position: absolute;
`;

const Button = styled.div`
	position: absolute;
	top: 0px;
	right: 0px;
	padding: 5px;
	height: 15px;
	width: 15px;
	transform: translate(50%, -50%);
	background: red;
	color: white;
	border-radius: 50%;
	transition: 0.3s ease all;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	cursor: pointer;
	&:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}
`;

export const LinksCustom = (props, stateActions) => {
	const { startPos, endPos, onLinkClick, link } = props;
	const centerX = startPos.x + (endPos.x - startPos.x) / 2;
	const centerY = startPos.y + (endPos.y - startPos.y) / 2;
	return (
		<React.Fragment>
			<LinkDefault {...props} />
			<Label style={{ left: centerX, top: centerY }}>
				<Button
					onClick={e => {
						// stateActions.onLinkClick({ linkId: link.id });
						// stateActions.onDeleteKey();
						stateActions.onLinkCancel({ linkId: link.id });
						e.stopPropagation();
					}}>
					x
				</Button>
			</Label>
		</React.Fragment>
	);
};
