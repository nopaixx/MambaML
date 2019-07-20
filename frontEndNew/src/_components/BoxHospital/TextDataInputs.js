import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	input: {
		display: 'none',
	},
	inputText: {
		marginRight: 10,
	},
}));

export const TextDataInputs = ({
	handleSubmit,
	handleChange,
	friendly_name,
	inputPorts,
	type,
	outputPorts,
}) => {
	const classes = useStyles();

	return (
		<div className={'complete-fields-box'}>
			<form name='form' onSubmit={handleSubmit} className={'box-info-form'}>
				<TextField
					id='friendly_name'
					label='Fiendly Name'
					className={classes.inputText}
					value={friendly_name || ''}
					name={'friendly_name'}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='type'
					label='Type'
					className={classes.inputText}
					value={type || ''}
					name={'type'}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='inputPorts'
					label='Input'
					type='number'
					className={classes.inputText}
					name={'inputPorts'}
					value={inputPorts || ''}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='outputPorts'
					label='Output'
					type='number'
					className={classes.inputText}
					name={'outputPorts'}
					value={outputPorts || ''}
					onChange={handleChange}
					margin='normal'
				/>
			</form>
		</div>
	);
};
