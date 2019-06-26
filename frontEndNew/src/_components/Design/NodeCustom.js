import * as React from 'react';
import styled from 'styled-components';
import { FlowChartWithState } from '@gonzalo10/react-diagrams/';
import { Page } from './Page';
import { chartSimple } from './chartSimple';
import pythonLogo from '../../python.png';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	icon: {
		cursor: 'pointer',
		fontSize: 18,
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	boxTitle: {
		width: '95%',
	},
}));

const BoxStyleWrapper = styled.div`
	padding: 15px;
	margin: 10px;
	font-size: 12px;
	text-align: center;
	display: flex;
	justify-content: space-around;
`;

export const NodeCustom = (props, runBoxCode) => {
	const classes = useStyles();
	const node = props.node;
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
			<div className={classes.boxTitle}>{boxTitle}</div>
			<Icon onClick={() => runBoxCode(node.id)} className={classes.icon}>
				play_circle_filled
			</Icon>
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
