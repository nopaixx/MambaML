import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';

import { MainListItems } from '../../../Pages/Dashboard/listItems';
import MambaLogo from '../../../Assets/Images/logo_peque.png';

const useStyles = makeStyles(theme => ({
	drawerPaperClose: {
		width: 80,
		borderRight: `1px solid ${theme.palette.primary.main}`,
		height: '100vh',
		position: 'fixed',
	},
	icon: {
		height: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: { width: 70, cursor: 'pointer' },
}));

const AppDrawer = ({ history }) => {
	const classes = useStyles();
	return (
		<div className={classes.drawerPaperClose}>
			<div className={classes.icon}>
				<img className={classes.logo} src={MambaLogo} alt={'logo'} />
			</div>
			<Divider />
			<MainListItems />
		</div>
	);
};

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users,
	};
}
const connectedProjectNavbar = connect(mapStateToProps)(AppDrawer);
export { connectedProjectNavbar as AppDrawer };
