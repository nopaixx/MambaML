import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Computer from '@material-ui/icons/Computer';
import Arrow from '@material-ui/icons/KeyboardArrowDown';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
	toolbar: {
		padding: '0 6vw',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.dark,
		width: 'auto',
		height: '60px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	logo: {
		display: 'flex',
		alignItems: 'center',
		fontSize: '30px',
		marginRight: '10px',
		height: '100%',
	},

	item: {
		padding: '0 1.1vw',
		fontSize: '20px',
		fontWeight: '600',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		zIndex: 90,
		'&:hover': {
			backgroundColor: 'rgba(107, 107, 107, 1)',
			cursor: 'pointer',
		},
	},

	navItem: {
		zIndex: 100,
		'&:hover': {
			backgroundColor: 'rgba(107, 107, 107, 1)',
			cursor: 'pointer',
		},
	},

	items: {
		display: 'flex',
		height: '100%',
	},
	icon: {
		paddingTop: '4px',
		paddingLeft: '3px',
		'&:hover': {
			color: '#fff',
		},
	},
	itemDown: {
		cursor: 'pointer',
		zIndex: 100,
		backgroundColor: 'rgba(107, 107, 107, 1)',
		width: '200px',
		'& div': {
			padding: '15px',
			fontWeight: '600',
			'&:hover': {
				backgroundColor: 'white',
				border: '1px solid',
				borderColor: theme.palette.primary.dark,
			},
		},
	},
}));

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

export default function NavBar(props) {
	const classes = useStyles();
	const [drop, setDrop] = useState({});

	function handleOver(e) {
		e.preventDefault();
		const { id } = e.target;
		console.log(e.target);
		setDrop({ [id]: true });
		console.log('The link was in.');
		console.log(drop[id]);
	}

	function handleOut(e) {
		e.preventDefault();
		const { id } = e.target;
		setDrop({ [id]: false });
		console.log('The link was out.');
		console.log(drop[id]);
	}

	console.log(drop);

	const DropDown = props => {
		return (
			<div id={props.id} className={classes.itemDown} onMouseLeave={handleOut}>
				<div>{props.item1}</div>
				<div>{props.item2}</div>
				<div>{props.item3}</div>
			</div>
		);
	};
	return (
		<HideOnScroll {...props}>
			<div
				position='fixed'
				style={{ position: 'fixed', width: '100%', zIndex: 100 }}>
				<div className={classes.toolbar}>
					<div className={classes.items}>
						<div className={classes.item} style={{ fontSize: '26px' }}>
							CompanyName
						</div>

						<div
							style={{ maxWidth: '90px' }}
							className={classes.navItem}
							onMouseLeave={handleOut}>
							<div
								className={classes.item}
								id={'start'}
								onMouseEnter={handleOver}>
								Start <Arrow className={classes.icon} />
							</div>
							{drop['start'] ? (
								<DropDown
									id={'start'}
									item1={'Overview'}
									item2={'Features'}
									item3={'Samples'}
								/>
							) : null}
						</div>

						<div
							style={{ maxWidth: '80px' }}
							className={classes.navItem}
							onMouseLeave={handleOut}>
							<div
								className={classes.item}
								id={'sell'}
								onMouseEnter={handleOver}>
								Sell <Arrow className={classes.icon} />
							</div>
							{drop['sell'] ? (
								<DropDown
									item1={'Data Analyst'}
									item2={'Automated Marchine Learning'}
									item3={'Software'}
								/>
							) : null}
						</div>

						<div
							style={{ maxWidth: '110px' }}
							className={classes.navItem}
							id={'market'}
							onMouseLeave={handleOut}>
							<div
								className={classes.item}
								id={'market'}
								onMouseEnter={handleOver}>
								Market <Arrow className={classes.icon} />
							</div>
							{drop['market'] ? (
								<DropDown
									item1={'Plans'}
									item2={'Competitors'}
									item3={'Advantages'}
								/>
							) : null}
						</div>

						<div
							style={{ maxWidth: '120px' }}
							className={classes.navItem}
							onMouseLeave={handleOut}>
							<div
								className={classes.item}
								id={'manage'}
								onMouseEnter={handleOver}>
								Manage <Arrow className={classes.icon} />
							</div>
							{drop['manage'] ? (
								<DropDown
									item1={'Data Analyst'}
									item2={'Automated Marchine Learning'}
									item3={'Software'}
								/>
							) : null}
						</div>
					</div>

					<div className={classes.items}>
						<div className={classes.item}>Pricing</div>
						<div
							style={{ maxWidth: '100px' }}
							className={classes.navItem}
							onMouseLeave={handleOut}>
							<div
								className={classes.item}
								id={'learn'}
								onMouseEnter={handleOver}>
								Learn <Arrow className={classes.icon} />
							</div>
							{drop['learn'] ? (
								<DropDown
									item1={'Data Analyst'}
									item2={'Automated Marchine Learning'}
									item3={'Software'}
								/>
							) : null}
						</div>
						<div className={classes.item}>Log in</div>
						<div className={classes.item}>Free Trial</div>
					</div>
				</div>
			</div>
		</HideOnScroll>
	);
}
