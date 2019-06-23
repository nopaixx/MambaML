import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: 'green',
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function ToolBar() {
	const classes = useStyles();
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	function handleChange(event) {
		setAuth(event.target.checked);
	}

	function handleMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.palette.secondary}>
				<Toolbar>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={auth}
									onChange={handleChange}
									aria-label="LoginSwitch"
								/>
							}
							label={auth ? 'Advance' : 'Simple'}
						/>
					</FormGroup>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Button variant="outlined" color="secondary">
						Save
					</Button>
					<Typography variant="h6" className={classes.title}>
						Settings
					</Typography>
					{auth && (
						<div>
							<IconButton
								aria-label="Account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit">
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
