import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	alert: {
		width: '30vw',
		border: '1px solid' + theme.palette.primary.main,
		borderRadius: 5,
		color: theme.palette.primary.contrastText,
		textAlign: 'center',
		backgroundColor: theme.palette.primary.light,
		margin: 'auto',
	},
}));

export const Alert = ({ text }) => {
	const classes = useStyles();
	return <div className={classes.alert}>{text}</div>;
};
