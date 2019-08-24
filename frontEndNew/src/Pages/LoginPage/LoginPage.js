import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './LoginPage.css';
import { userActions } from '../../_actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
		backgroundImage:
			'url(https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapersdsc.net%2Fwp-content%2Fuploads%2F2017%2F05%2FPictures-of-Black-Mamba-.png&f=1)',

		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
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
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
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
