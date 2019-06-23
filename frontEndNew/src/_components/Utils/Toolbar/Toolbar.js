import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
		height: 50,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

export const ProjectToolbar = ({ projectName, onSaveProject }) => {
	const classes = useStyles();
	return (
		<nav className={classes.navBar}>
			<TextField
				id='standard-name'
				label='Project name'
				className={classes.textField}
				name={'projectName'}
				value={projectName}
				//onChange={props.handleChange}
				margin='none'
			/>
			{/* <Input
				onChange={e => setProjectName(e.target.value)}
				value={projectName}
			/> */}
			<Button
				id={'PythonScript'}
				variant='outlined'
				color='primary'
				className={classes.button}
				onClick={onSaveProject}>
				Save
			</Button>

			{/* <Button label={'darkMode'} />
			<Button onClick={onSaveProject} label={'save'} /> */}
		</nav>
	);
};
