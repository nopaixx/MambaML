import * as React from 'react';
import styled from 'styled-components';

import pythonLogo from '../../python.png';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { ClockLoader } from '../../_components/Utils/Loader/Loader';
import Tooltip from '@material-ui/core/Tooltip';
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
	let error;

	const handleClickrunBoxCode = e => {
		e.preventDefault();
		e.stopPropagation();
		runBoxCode(node.id);
	};

	if (node.properties.payload.name) {
		name = node.properties.payload.name;
		name = name.split('-');
		name = name[name.length - 1];
	}
	if (node.properties.payload.result) {
		error = node.properties.payload.result.error_message;
	}
	if (name) {
		boxTitle = name;
	} else {
		node.type ? (boxTitle = node.type.split('-')[1]) : (boxTitle = node.type);
	}
	if (boxesStatus) boxStatus = boxesStatus[node.id];
	return (
		<BoxStyleWrapper>
			<div
				style={
					node.properties.payload.hasChange
						? {
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: 'yellow',
								position: 'absolute',
								top: 0,
								right: 0,
						  }
						: {
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: 'green',
								position: 'absolute',
								top: 0,
								right: 0,
						  }
				}
			/>
			<img
				alt={'python'}
				style={{ width: 30, position: 'absolute', left: 10, top: 10 }}
				src={pythonLogo}
			/>
			<div className={classes.boxTitle}>{boxTitle}</div>
			<Icon onClick={handleClickrunBoxCode} className={classes.icon}>
				play_circle_filled
			</Icon>
			<LoadingWarapper
				boxStatus={boxStatus}
				runBoxCode={runBoxCode}
				node={node}
				projectStatus={projectStatus}
				error={error}
			/>
		</BoxStyleWrapper>
	);
};

const LoadingWarapper = ({
	boxStatus,
	runBoxCode,
	node,
	projectStatus,
	error,
}) => {
	const classes = useStyles();
	if (boxStatus === 'RUNNING' || boxStatus === 'INIT') {
		//if (boxStatus === 'RUNNING') {
		return <ClockLoader />;
	} else if (boxStatus === 'RUNNED') {
		return (
			<Icon className={classes.confirmationIcon}>check_circle_outline</Icon>
		);
	} else if (boxStatus === 'ERROR') {
		return (
			<React.Fragment>
				<Tooltip title={error} placement='bottom-start'>
					<Icon className={classes.confirmationIcon}>error</Icon>
				</Tooltip>
			</React.Fragment>
		);
	} else {
		return null;
	}
};
