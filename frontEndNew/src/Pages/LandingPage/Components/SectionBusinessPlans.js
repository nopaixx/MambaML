import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StartUp from '../assets/img/startup.png';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import Head from '../assets/img/head.png';
import Prediction from '../assets/img/prediction.png';
import Chip from '../assets/img/chip.png';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: '6vw 8vw',
		height: '30vw',
		maxHeight: '400px',
		backgroundColor: theme.palette.primary.main,
	},
	gridContainer: {
		display: 'grid',
		height: '100%',
		gridTemplateColumns: 'repeat(4, 3fr)',
		backgroundColor: 'transparent',
		gridColumnGap: '4vw',
		maxHeight: 'inherit',
		color: '#fff',
		alignItems: 'center',
	},

	item1: {
		gridRow: '1',
		gridColumn: '1 / 2',
		backgroundColor: theme.palette.primary.light,
		border: '1px solid white',
		borderRadius: '2%',
		display: 'flex',
		alignItems: 'center',
		height: '80%',
		justifyContent: 'space-around',
		flexDirection: 'column',
		textAlign: 'center',
		'&:hover': {
			boxShadow:
				'0 4px 8px 0 rgba(0, 187, 255, 0.7), 0 6px 20px 0 rgba(0, 187, 255, 0.68)',
			cursor: 'pointer',
		},
	},

	item2: {
		gridRow: '1',
		gridColumn: '2 / 3',
		backgroundColor: theme.palette.primary.light,
		border: '1px solid white',
		borderRadius: '2%',
		display: 'flex',
		alignItems: 'center',
		height: '80%',
		justifyContent: 'space-around',
		flexDirection: 'column',
		textAlign: 'center',
		'&:hover': {
			boxShadow:
				'0 4px 8px 0 rgba(0, 187, 255, 0.7), 0 6px 20px 0 rgba(0, 187, 255, 0.68)',
			cursor: 'pointer',
		},
	},
	item3: {
		gridRow: '1',
		gridColumn: '3 / 4',
		backgroundColor: theme.palette.primary.light,
		border: '1px solid white',
		borderRadius: '2%',
		display: 'flex',
		alignItems: 'center',
		height: '80%',
		justifyContent: 'space-around',
		flexDirection: 'column',
		textAlign: 'center',
		'&:hover': {
			boxShadow:
				'0 4px 8px 0 rgba(0, 187, 255, 0.7), 0 6px 20px 0 rgba(0, 187, 255, 0.68)',
			cursor: 'pointer',
		},
	},
	item4: {
		gridRow: '1',
		gridColumn: '4 / 5',
		backgroundColor: theme.palette.primary.light,
		border: '1px solid white',
		borderRadius: '2%',
		display: 'flex',
		alignItems: 'center',
		height: '80%',
		justifyContent: 'space-around',
		flexDirection: 'column',
		textAlign: 'center',
		'&:hover': {
			boxShadow:
				'0 4px 8px 0 rgba(0, 187, 255, 0.7), 0 6px 20px 0 rgba(0, 187, 255, 0.68)',
			cursor: 'pointer',
		},
	},

	highlight: {
		fontSize: '27px',
		fontWeight: '700',
		paddingBottom: '5px',
		color: 'black',
	},
	arrow: {
		paddingLeft: '5px',
		width: '40px',
	},

	learn: {
		color: 'black',
		display: 'flex',
		alignItems: 'inherit',
		paddingLeft: '20px',
		fontWeight: '700',
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<div className={classes.item1}>
					<div className={classes.icon}>
						<img src={StartUp} width='90px' alt='Solution' />
					</div>
					<div>
						<div className={classes.highlight}>
							Solution <br /> Acceleration
						</div>
						<div style={{ color: 'gray', fontWeight: '400' }}>
							Solve urgent business <br />
							needs faster
						</div>
					</div>
					<div className={classes.learn}>
						Learn More
						<Arrow className={classes.arrow} />
					</div>
				</div>
				<div className={classes.item2}>
					<div className={classes.icon}>
						<img src={Prediction} width='90px' alt='Productivity' />
					</div>
					<div>
						<div className={classes.highlight}>
							Data Scientist
							<br /> Productivity
						</div>
						<div style={{ color: 'gray', fontWeight: '400' }}>
							Get more projects done
							<br /> in less time
						</div>
					</div>
					<div className={classes.learn}>
						Learn More
						<Arrow className={classes.arrow} />
					</div>
				</div>
				<div className={classes.item3}>
					<div className={classes.icon}>
						<img src={Chip} width='90px' alt='AI' />
					</div>
					<div>
						<div className={classes.highlight}>
							The AI-Driven
							<br /> Enterprise
						</div>
						<div style={{ color: 'gray', fontWeight: '400' }}>
							Embed AI in all
							<br /> business processes
						</div>
					</div>
					<div className={classes.learn}>
						Learn More
						<Arrow className={classes.arrow} />
					</div>
				</div>
				<div className={classes.item4}>
					<div className={classes.icon}>
						<img src={Head} width='90px' alt='Democratization' />
					</div>
					<div>
						<div className={classes.highlight}>
							Data Science
							<br /> Democratization
						</div>
						<div style={{ color: 'gray', fontWeight: '400' }}>
							Empower your existing
							<br /> team to build AI
						</div>
					</div>
					<div className={classes.learn}>
						Learn More
						<Arrow className={classes.arrow} />
					</div>
				</div>
			</div>
		</div>
	);
}
