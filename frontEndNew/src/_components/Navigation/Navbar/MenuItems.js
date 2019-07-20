import React from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	logo: { width: 70, cursor: 'pointer' },
	navbarMenuBtn: {
		color: 'white',
		fontWeight: 600,
		fontSize: 14,
	},
	navMenus: {
		display: 'flex',
		flexDirection: 'row-reverse',
		width: '90vw',
	},
});

export const MenuItems = ({ history }) => {
	const classes = useStyles();
	return (
		<div className={classes.navMenus}>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				className={classes.navbarMenuBtn}
				onClick={() => history.push('/projects')}>
				Platfrom
			</Button>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				className={classes.navbarMenuBtn}
				onClick={() => history.push('/pricing')}>
				Solutions
			</Button>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				className={classes.navbarMenuBtn}
				onClick={() => history.push('/about')}>
				About
			</Button>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				className={classes.navbarMenuBtn}
				onClick={() => history.push('/pricing')}>
				Pricing
			</Button>
		</div>
	);
};
