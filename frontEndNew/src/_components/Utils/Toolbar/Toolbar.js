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
	runWrapper: {
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
	},
	saveWrapper: {
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
	},
	exportWrapper: {
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
	},
	importWrapper: {
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
	},
	savedWrapper: {
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'column',
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
	runExportProject,
	exportStatus,
	runImportProject,
	importStatus,
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
					<div className={classes.saveWrapper}>
						<div>
							<Icon className={classes.icon} onClick={onSaveProject}>
								save
							</Icon>
							<div className={classes.iconText}>Save</div>
						</div>
						<SaveWarapper
							onSaveProject={onSaveProject}
							savedProject={savedProject}
						/>
					</div>
					<div className={classes.runWrapper}>
						<div>
							<Icon onClick={runFullProject} className={classes.icon}>
								play_circle_filled
							</Icon>
							<div className={classes.iconText}>Run Project</div>
						</div>
						<LoadingWarapper
							projectStatus={projectStatus}
							runFullProject={runFullProject}
						/>
					</div>
					<div className={classes.exportWrapper}>
						<div>
							<Icon onClick={runExportProject} className={classes.icon}>
								get_app
							</Icon>
							<div className={classes.iconText}>Export Project</div>
						</div>
						<ExportingWrapper
							exportStatus={exportStatus}
							runExportProject={runExportProject}
						/>
					</div>
					<div className={classes.importWrapper}>
						<div>
							<Icon onClick={runImportProject} className={classes.icon}>
								publish
							</Icon>
							<div className={classes.iconText}>Import Project</div>
						</div>
						<ImportingWrapper
							importStatus={importStatus}
							runImportProject={runImportProject}
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
const ImportingWrapper = ({ importStatus, runImportProject }) => {
	return null;
};
const ExportingWrapper = ({ exportStatus, runExportProject }) => {
	return null;
};
const LoadingWarapper = ({ projectStatus, runFullProject }) => {
	const classes = useStyles();
	if (!projectStatus) {
		return null;
	}
	if (projectStatus.project_stat === 'OK') {
		return (
			<div className={classes.savedWrapper}>
				<Icon className={classes.confirmationIcon}>check_circle_outline</Icon>
				<div className={classes.iconText}>Run Successful</div>
			</div>
		);
	} else if (
		projectStatus === 'running' ||
		projectStatus.project_stat === 'PENDING'
	) {
		return <ClockLoader />;
	} else if (projectStatus.project_stat === 'ERROR') {
		return (
			<div className={classes.errorIcon}>
				<Icon>error</Icon>
			</div>
		);
	} else {
		return null;
	}
};
const SaveWarapper = ({ savedProject, onSaveProject }) => {
	const classes = useStyles();
	if (savedProject !== true) {
		return (
			<div className={classes.savedWrapper}>
				<Icon className={classes.confirmationIcon}>check_circle_outline</Icon>
				<div className={classes.iconText}>Saved</div>
			</div>
		);
	} else {
		return null;
	}
};
