import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	emptyBall: {
		width: 10,
		height: 10,
		borderRadius: '50%',
		border: '1px solid ' + theme.palette.primary.main,
		backgroundColor: 'transparent',
		margin: 6,
	},
	fullBall: {
		width: 13,
		height: 13,
		borderRadius: '50%',
		border: '1px solid ' + theme.palette.primary.main,
		backgroundColor: theme.palette.primary.main,
		margin: 6,
	},
	ballWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
}));

export const BallsSlider = ({ step }) => {
	const classes = useStyles();
	const fullBalls = [];
	const emptyBalls = [];
	for (let i = 0; i < step; i++) {
		fullBalls.push(<div className={classes.fullBall} />);
	}
	for (let i = 0; i < 4 - step; i++) {
		emptyBalls.push(<div className={classes.emptyBall} />);
	}

	return (
		<div className={classes.ballWrapper}>
			{fullBalls.map(ball => ball)}
			{emptyBalls.map(ball => ball)}
		</div>
	);
};
