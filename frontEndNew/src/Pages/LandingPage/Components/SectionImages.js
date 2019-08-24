import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: '0 4vw',
		height: '30vw',
		maxHeight: '400px',
		backgroundColor: theme.palette.primary.main,
	},
	gridContainer: {
		display: 'grid',
		height: '100%',
		gridTemplateColumns: 'repeat(3, 1fr)',
		backgroundColor: 'transparent',
		gridColumnGap: '2em',
		maxHeight: 'inherit',
		'& div': {
			textAlign: 'center',
			fontSize: '30px',
		},
	},

	item1: {
		gridRowStart: '2',
		gridRowEnd: '6',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		'& img': {
			height: '90%',
			width: '90%',
			boxShadow:
				'0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.7)',
			borderRadius: '1.5%',
		},
	},

	item2: {
		gridColumn: '2 / 3',
		gridRow: '1 / 5',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& img': {
			height: '70%',
			width: '90%',
			boxShadow:
				'0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.7)',
			borderRadius: '1.5%',
		},
	},
	item3: {
		gridColumn: '3 / 4',
		gridRow: '2 / 6',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		'& img': {
			height: '80%',
			width: '95%',
			boxShadow:
				'0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.7)',
			borderRadius: '1.5%',
		},
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<div className={classes.item1}>
					<img
						src='https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
						alt='Data'
					/>
				</div>
				<div className={classes.item2}>
					<img
						src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
						alt='graphs'
					/>
				</div>
				<div className={classes.item3}>
					<img
						src='https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
						alt='stockMarket'
					/>
				</div>
			</div>
		</div>
	);
}
