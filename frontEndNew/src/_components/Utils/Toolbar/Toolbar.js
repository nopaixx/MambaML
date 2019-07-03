import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { ClockLoader } from '../Loader/Loader';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
	navBar: {
		backgroundColor: theme.palette.primary.contrastText,
		border: `1px solid ${theme.palette.primary.main}`,
		height: 60,
		padding: 5,
		position: 'absolute',
		bottom: 0,
		width: '100vw',
		zIndex: 4,
		display: 'flex',
		alignItems: 'center',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	icon: {
		cursor: 'pointer',
		fontSize: 26,
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	iconWrapper: {
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
	},
	iconText: {
		fontSize: 11,
	},
	closeToolbar: {
		display: 'flex',
		border: `1px solid ${theme.palette.primary.main}`,
		position: 'absolute',
		width: '100vw',
		padding: 3,
		bottom: 0,
		backgroundColor: theme.palette.primary.contrastText,
		zIndex: 999,
	},
	confirmationIcon: {
		cursor: 'pointer',
		fontSize: 26,
		'&:hover': {
			color: theme.palette.primary.main,
		},
		color: 'green',
	},
}));

export const ProjectToolbar = ({
	projectName,
	onSaveProject,
	handleChangeName,
	runFullProject,
	projectStatus,
	savedProject,
}) => {
	const [isOpen, setOpen] = useState(false);
	const classes = useStyles();
	return (
		<React.Fragment>
			{isOpen ? (
				<nav className={classes.navBar}>
					<Tooltip title='Close tools' placement='bottom-start'>
						<Icon
							titile={'Open tools'}
							className={classes.icon}
							onClick={() => setOpen(false)}>
							menu
						</Icon>
					</Tooltip>
					<TextField
						id='standard-name'
						label='Project name'
						className={classes.textField}
						name={'projectName'}
						value={projectName}
						onChange={handleChangeName}
						margin='none'
					/>
					<div className={classes.iconWrapper}>
						<SaveWarapper
							onSaveProject={onSaveProject}
							savedProject={savedProject}
						/>
					</div>
					<div className={classes.iconWrapper}>
						<LoadingWarapper
							projectStatus={projectStatus}
							runFullProject={runFullProject}
						/>
					</div>
				</nav>
			) : (
				<div className={classes.closeToolbar}>
					<Tooltip title='Open tools' placement='bottom-start'>
						<Icon className={classes.icon} onClick={() => setOpen(true)}>
							menu
						</Icon>
					</Tooltip>
					<div
						style={{ marginLeft: 10, display: 'flex', alignItems: 'center' }}>
						Toolbar
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

const LoadingWarapper = ({ projectStatus, runFullProject }) => {
	const classes = useStyles();
	if (projectStatus === undefined) {
		return (
			<React.Fragment>
				<Icon onClick={runFullProject} className={classes.icon}>
					play_circle_filled
				</Icon>
				<div className={classes.iconText}>Run Project</div>
			</React.Fragment>
		);
	} else if (projectStatus === 'PENDING') {
		return (
			<React.Fragment>
				<Icon className={classes.confirmationIcon}>check_circle_outline</Icon>
				<div className={classes.iconText}>Run Successful</div>
			</React.Fragment>
		);
	} else {
		return <ClockLoader />;
	}
};
const SaveWarapper = ({ savedProject, onSaveProject }) => {
	const classes = useStyles();
	if (savedProject === false) {
		return (
			<React.Fragment>
				<Icon className={classes.icon} onClick={onSaveProject}>
					save
				</Icon>
				<div className={classes.iconText}>Save</div>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<Icon className={classes.confirmationIcon}>check_circle_outline</Icon>
				<div className={classes.iconText}>Saved</div>
			</React.Fragment>
		);
	}
};
