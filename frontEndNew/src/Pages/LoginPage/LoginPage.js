import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './LoginPage.css';
import { userActions } from '../../_actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MambamlBackground from '../../Assets/Images/MambaML-big.png';
import MambamlLogo from '../../Assets/Images/MambaML.png';

function MadeWithLove() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Built with love by the '}
			<Link color='inherit' to='https://material-ui.com/'>
				MambaML
			</Link>
			{' team.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: `url(${MambamlBackground})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'bottom',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '-29vh',
		flexDirection: 'column',
		textAlign: 'center',
	},
	login: {
		height: '70vh',
		margin: 'auto',
	},
	free: {
		fontWeight: '700',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const LoginPage = props => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const updateFormData = event =>
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});

	const handleSubmit = e => {
		e.preventDefault();
		const { username, password } = formData;
		const { dispatch } = props;
		if (username && password) {
			dispatch(userActions.login(username, password));
		}
	};

	const { username, password } = formData;
	const classes = useStyles();

	return (
		<Grid container component='main' className={classes.root}>
			<Grid item xs={false} sm={7} md={8} className={classes.image}>
				<Typography component='h1' variant='h1'>
					Get Started for
					<Typography className={classes.free} component='h1' variant='h1'>
						free
					</Typography>
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
				md={3}
				component={Paper}
				elevation={8}
				square
				className={classes.login}>
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Welcome to Mamba
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='user'
							name='username'
							autoComplete='email'
							autoFocus
							value={username}
							onChange={e => updateFormData(e)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={e => updateFormData(e)}
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Log In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to='/register' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<MadeWithLove />
						</Box>
					</form>
				</div>
			</Grid>
			<Grid item xs={false} sm={1} md={1} />
		</Grid>
	);
};

function mapStateToProps(state) {
	const { loggingIn } = state.authentication;
	return {
		loggingIn,
	};
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
