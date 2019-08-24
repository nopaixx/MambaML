import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: '0 10vw',
		paddingTop: '3em',
		height: '95vw',
		backgroundColor: theme.palette.primary.light,
	},

	intro: {
		textAlign: 'center',
		'& div': {
			color: theme.palette.primary.contrastText,
			fontSize: 40,
			fontWeight: 'bold',
			paddingBottom: '1.2vw',
		},
		'& p': {
			color: 'gray',
			margin: 0,
			fontSize: 25,
			lineHeight: '1.4em',
			marginBottom: '4vw',
		},
	},

	item: {
		margin: '5vw 0',
		display: 'flex',
		textAlign: 'center',
		height: '22vw',
	},

	imageLeft: {
		flex: '60%',
		display: 'flex',
		justifyContent: 'flex-end',
		'& img': {
			borderRadius: '10px',
			boxShadow:
				'0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.7)',
		},
	},

	imageRight: {
		flex: '60%',
		display: 'flex',
		justifyContent: 'flex-start',
		'& img': {
			borderRadius: '10px',
			boxShadow:
				'0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.7)',
		},
	},

	text: {
		flex: '50%',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'left',
		flexDirection: 'column',
		lineHeight: '1.6em',
		paddingLeft: '4vw',
		'& p': {
			color: 'gray',
			width: '25vw',
			fontSize: '20px',
			lineHeight: '1.6em',
		},
	},

	highlight: {
		display: 'flex',
		lineHeight: '1.4em',
		color: theme.palette.primary.contrastText,
	},

	tittle: {
		width: '35vw',
		fontSize: '35px',
		fontWeight: 'bold',
	},
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<div className={classes.intro}>
					<div>Motivational Phrase</div>
					<p>
						One platform with all the ecommerce and point of sale <br />
						features you need to start, run, and grow your business.
					</p>
				</div>

				<div className={classes.item}>
					<div className={classes.imageLeft}>
						<img
							src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1902&q=80'
							alt='Start'
							height='100%'
							width='80%'
						/>
					</div>
					<div className={classes.text}>
						<div className={classes.tittle}>
							<span className={classes.highlight}>Start —</span>
							your Business Journey
						</div>
						<p>
							Find a business name, buy a domain, and create a brand with our
							free tools.
						</p>
					</div>
				</div>
				<div className={classes.item}>
					<div
						className={classes.text}
						style={{ marginLeft: '6vw', width: '30px' }}>
						<div className={classes.tittle}>
							<span className={classes.highlight}>Sell —</span> everywhere
						</div>
						<p>
							Use one platform to sell products to anyone, anywhere—online with
							your ecommerce store, online marketplaces, and social media, and
							in-person with point of sale.
						</p>
					</div>
					<div className={classes.imageRight}>
						<img
							src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
							alt='Sell'
							height='100%'
							width='85%'
						/>
					</div>
				</div>
				<div className={classes.item}>
					<div className={classes.imageLeft}>
						<img
							src='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
							alt='Market'
							height='100%'
							width='80%'
						/>
					</div>
					<div className={classes.text}>
						<div className={classes.tittle}>
							<span className={classes.highlight}>Market —</span>your business
						</div>
						<p>
							Take the guesswork out of marketing with built-in tools that help
							you create, execute, and analyze campaigns on Facebook and Google.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
