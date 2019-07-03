import React, { useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const BootstrapInput = withStyles(theme => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function Dropdown({ name, options, selectedOptions }) {
	const classes = useStyles();
	const [state, setState] = React.useState();
	const [labelWidth, setLabelWidth] = React.useState(0);
	const inputLabel = useRef(null);

	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleChange = event => {
		const { value } = event.target;
		selectedOptions(value);
		setState(value);
	};
	return (
		<div className={classes.root}>
			<FormControl variant='outlined' className={classes.formControl}>
				<InputLabel ref={inputLabel} htmlFor='outlined-age-native-simple'>
					{name}
				</InputLabel>
				<Select
					native
					value={state}
					onChange={handleChange}
					input={
						<OutlinedInput
							name='age'
							labelWidth={labelWidth}
							id='outlined-age-native-simple'
						/>
					}>
					<option value='' />
					{options
						? options.map((option, key) => {
								return (
									<option key={key} value={option}>
										{option}
									</option>
								);
						  })
						: null}
				</Select>
			</FormControl>
		</div>
	);
}
