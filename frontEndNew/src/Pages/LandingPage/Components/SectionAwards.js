import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Database from '../assets/img/server.png';
import Digital from '../assets/img/digital.png';
import Ai from '../assets/img/ai.png';
import Robot from '../assets/img/robot.png';
import Visualization from '../assets/img/visualization.png';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		padding: '0 4vw',
		width: 'auto',
		marginTop: '5vw',
		height: '30vw',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: theme.palette.primary.light,
	},

	circle: {
		borderRadius: '50%',
		boxShadow:
			'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		fontSize: '30px',
		width: 200,
		height: 200,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'&:hover': {
			boxShadow:
				'0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.58)',
			backgroundColor: theme.palette.primary.lightText,
			cursor: 'pointer',
		},
	},

	item1: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px dashed gray',
		borderRadius: '50%',
		width: 250,
		height: 250,
		position: 'relative',
		left: '80px',
		'&:hover': {
			fontWeight: '700',
		},
	},

	item2: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px dashed gray',
		borderRadius: '50%',
		width: 250,
		height: 250,
		position: 'relative',
		top: '106px',
		left: '41px',
		'&:hover': {
			fontWeight: '700',
		},
	},
	item3: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px dashed gray',
		borderRadius: '50%',
		width: 250,
		height: 250,
		'&:hover': {
			fontWeight: '700',
		},
	},
	item4: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px dashed gray',
		borderRadius: '50%',
		width: 250,
		height: 250,
		position: 'relative',
		top: '106px',
		left: '-42px',
		'&:hover': {
			fontWeight: '700',
		},
	},
	item5: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px dashed gray',
		borderRadius: '50%',
		width: 250,
		height: 250,
		position: 'relative',
		left: '-85px',
		'&:hover': {
			fontWeight: '700',
		},
	},
	text: {
		position: 'absolute',
		top: '240px',
		fontSize: '20px',
		textAlign: 'center',
		'&:hover': {
			fontWeight: '700',
			cursor: 'pointer',
		},
	},
	learn: {
		border: '1px solid black',
		borderRadius: '40px',
		display: 'flex',
		justifyContent: 'center',
		width: '100px',
		margin: '0 auto',
		padding: '15px',

		// marginBottom: '40px',
		'&:hover': {
			backgroundColor: theme.palette.primary.lightText,
			fontWeight: '700',
			border: '2px solid black',
			cursor: 'pointer',
		},
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.root}>
				<div className={classes.item1}>
					<div className={classes.circle}>
						<img src={Database} width='70%' alt='Clean' />
					</div>
					<div className={classes.text}>
						Clean <br />& Wrangler
					</div>
				</div>
				<div className={classes.item2}>
					<div className={classes.circle}>
						<img src={Digital} width='70%' alt='Build' />
					</div>
					<div className={classes.text}>
						Build <br />& Apply
					</div>
				</div>
				<div className={classes.item3}>
					<div className={classes.circle}>
						<img src={Visualization} width='70%' alt='Mining' />
					</div>
					<div className={classes.text}>
						Mining <br />& Visualization
					</div>
				</div>
				<div className={classes.item4}>
					<div className={classes.circle}>
						<img src={Robot} width='70%' alt='Deploy' />
					</div>
					<div className={classes.text}>Deploy to Production</div>
				</div>
				<div className={classes.item5}>
					<div className={classes.circle}>
						<img src={Ai} width='70%' alt='Monitor' />
					</div>
					<div className={classes.text}>
						Monitor <br />& Adjust
					</div>
				</div>
			</div>
			<div style={{ height: '8vw' }}>
				<div className={classes.learn}>Learn More</div>
			</div>
		</div>
	);
}
