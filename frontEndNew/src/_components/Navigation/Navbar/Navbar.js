import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MambaLogo from '../../../Assets/Images/logo_peque.png';

const useStyles = makeStyles(theme => ({
	appBar: {
		minHeight: theme.appBar.height,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	logo: { width: 70, cursor: 'pointer' },
	navbarMenuBtn: {
		color: 'white',
		fontWeight: 600,
		fontSize: 14,
	},
	appbar: {
		marginLeft: 70,
	},
	menu: {
		position: 'absolute',
		right: 16,
	},
}));

const Navbar = ({ history, user, users, dispatch, dashboard, url }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	function handleProfileMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
	}

	function handleMenuClose() {
		setAnchorEl(null);
		handleMobileMenuClose();
	}

	function handleMobileMenuOpen(event) {
		setMobileMoreAnchorEl(event.currentTarget);
	}

	const handleClickDashboard = () => {
		history.push('/dashboard');
		handleMenuClose();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			className={classes.menu}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleClickDashboard}>Dashboard</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
			<MenuItem onClick={() => dispatch(userActions.logout())}>
				Log out
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton aria-label='Show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label='Show 11 new notifications' color='inherit'>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='Account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);
	const NavBar = () => {
		return (
			<AppBar position='static' className={''}>
				<Toolbar className={classes.appBar}>
					{dashboard ? null : (
						<img
							onClick={() => history.push('/dashboard')}
							className={classes.logo}
							src={MambaLogo}
							alt={'logo'}
						/>
					)}
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Button
							aria-controls='simple-menu'
							aria-haspopup='true'
							className={classes.navbarMenuBtn}
							onClick={() => history.push('/projects')}>
							Projects
						</Button>
						<Button
							aria-controls='simple-menu'
							aria-haspopup='true'
							className={classes.navbarMenuBtn}
							onClick={() => history.push('/dashboard')}>
							Dashboard
						</Button>
						<IconButton
							edge='end'
							aria-label='Account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='Show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		);
	};

	return (
		<div>
			<NavBar />
			{/* {renderMobileMenu} */}
			{renderMenu}
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
const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };
