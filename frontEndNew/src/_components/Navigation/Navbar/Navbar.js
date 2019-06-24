import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MambaLogo from '../../../logo_peque.png';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	logo: { width: 70, cursor: 'pointer' },
	navbarMenuBtn: {
		color: 'white',
		fontWeight: 600,
		fontSize: 18,
	},
	navMenus: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '80vw',
	},
});

export default function NormalNavbar({ history }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static' color='primary'>
				<Toolbar>
					<div>
						<img
							onClick={() => history.push('/')}
							className={classes.logo}
							src={MambaLogo}
							alt={'logo'}
						/>
					</div>
					<MenuItems history={history} />
				</Toolbar>
			</AppBar>
		</div>
	);
}

const MenuItems = ({ history }) => {
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
