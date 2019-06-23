import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

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
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	icon: {
		cursor: 'pointer',
		marginRight: 10,
	},
	closeToolbar: {
		display: 'flex',
		border: `1px solid ${theme.palette.primary.main}`,
	},
}));

export const ProjectToolbar = ({
	projectName,
	onSaveProject,
	handleChangeName,
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
					<Button
						id={'PythonScript'}
						variant='outlined'
						color='primary'
						className={classes.button}
						onClick={onSaveProject}>
						Save
					</Button>
				</nav>
			) : (
				<div className={classes.closeToolbar}>
					<Tooltip title='Open tools' placement='bottom-start'>
						<Icon className={classes.icon} onClick={() => setOpen(true)}>
							menu
						</Icon>
					</Tooltip>
					<div>Toolbar</div>
				</div>
			)}
		</React.Fragment>
	);
};
