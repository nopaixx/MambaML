import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function MadeWithLove() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Built with love by the '}
			<RouterLink color='inherit' to='#'>
				MambaML
			</RouterLink>
			{' team.'}
		</Typography>
	);
}
const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	image: {
		backgroundImage:
			'url(https://source.unsplash.com/1600x900/?artificial-intelligence)',

		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh',
	},

	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

const LandingPage1 = props => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				<div className={classes.heroContent}>
					<Container className={classes.image}>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom>
							MambaML
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Enabling the AI-Driven Enterprise
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							with Automated Machine Learning
						</Typography>
					</Container>
				</div>
			</main>
			<footer className={classes.footer}>
				<Typography variant='h6' align='center' gutterBottom>
					Footer
				</Typography>
				<Typography
					variant='subtitle1'
					align='center'
					color='textSecondary'
					component='p'>
					Something here to give the footer a purpose!
				</Typography>
				<MadeWithLove />
			</footer>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { projects } = state.project;
	const { user } = authentication;
	return {
		user,
		users,
		projects,
	};
}

const connectedHomePage = connect(mapStateToProps)(LandingPage1);
export { connectedHomePage as LandingPage };
