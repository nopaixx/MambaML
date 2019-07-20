import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { MenuItems } from './MenuItems';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import MambaLogo from '../../../logo_peque.png';

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
