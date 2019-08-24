import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PLayCircleOutline from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.primary.main,
		paddingTop: '3vw',
		padding: '0 6vw',
		height: '40vw',
	},
	div: {
		padding: theme.spacing(2),
		marginTop: '2vw',
		backgroundColor: 'transparent',
		height: '30vw',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'start',
		flexDirection: 'column',
	},
	paper: {
		marginTop: '2vw',
		height: '30vw',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& img': {
			zIndex: '1',
		},
	},
	button: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.dark,
		height: '6em',
		width: '12em',
		'&:hover': {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	h1: {
		fontSize: '5vw',
		fontFamily: 'Bebas Neue',
		lineHeight: '1.7em',
		margin: '0px',
		color: '#fff',
		maxWidth: '100%',
	},

	icon: {
		zIndex: '2',
		position: 'absolute',
		textAlign: 'center',
		height: '10vw',
		width: '10vw',
		color: theme.palette.primary.dark,
		'&:hover': {
			color: 'rgb(117, 214, 250)',
			cursor: 'pointer',
		},
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<div className={classes.div}>
						<h1 className={classes.h1}>
							Improve Your Buisness With Machine Learning
						</h1>
						<p style={{ fontSize: '1.3em', color: '#fff' }}>
							Use the Newest Technology to be the Best.
						</p>
						<Button variant='contained' className={classes.button}>
							Start Now !
						</Button>
					</div>
				</Grid>
				<Grid item xs={6}>
					<div className={classes.paper}>
						<PLayCircleOutline className={classes.icon} />
						<img
							src='https://images.unsplash.com/photo-1525475711852-ed23365b4d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
							alt='Video'
							height='100%'
							width='100%'
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
