import * as React from 'react';
import styled from 'styled-components';
import { FlowChartWithState } from '@gonzalo10/react-diagrams/';
import { Page } from './Page';
import { chartSimple } from './chartSimple';
import pythonLogo from '../../python.png';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { ClockLoader } from '../../_components/Utils/Loader/Loader';
const useStyles = makeStyles(theme => ({
	icon: {
		cursor: 'pointer',
		fontSize: 18,
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	confirmationIcon: {
		cursor: 'pointer',
		fontSize: 18,
		'&:hover': {
			color: theme.palette.primary.main,
		},
		color: 'green',
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

export const NodeCustom = (props, runBoxCode, boxesStatus, projectStatus) => {
	const classes = useStyles();
	const node = props.node;
	let name;
	let boxTitle;
	let boxStatus;
	if (node.properties.payload.name) {
		name = node.properties.payload.name;
		name = name.split('-');
		name = name[name.length - 1];
	}
	if (name) {
		boxTitle = name;
	} else {
		node.type ? (boxTitle = node.type.split('-')[1]) : (boxTitle = node.type);
	}

	if (boxesStatus) boxStatus = boxesStatus[node.id];
	return (
		<BoxStyleWrapper>
			<img
				alt={'python'}
				style={{ width: 30, position: 'absolute', left: 10, top: 10 }}
				src={pythonLogo}
			/>
			<div className={classes.boxTitle}>{boxTitle}</div>
			<LoadingWarapper
				boxStatus={boxStatus}
				runBoxCode={runBoxCode}
				node={node}
				projectStatus={projectStatus}
			/>
		</BoxStyleWrapper>
	);
};

const LoadingWarapper = ({ boxStatus, runBoxCode, node }) => {
	const classes = useStyles();
	if (boxStatus === undefined) {
		return (
			<Icon onClick={() => runBoxCode(node.id)} className={classes.icon}>
				play_circle_filled
			</Icon>
		);
	} else if (boxStatus === 'RUNNING' || boxStatus === 'INIT') {
		return <ClockLoader />;
	} else if (boxStatus === 'RUNNED') {
		return (
			<Icon className={classes.confirmationIcon}>check_circle_outline</Icon>
		);
	} else if (boxStatus === 'ERROR') {
		return <Icon className={classes.confirmationIcon}>error</Icon>;
	} else {
		return <ClockLoader />;
	}
};
