import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { projectActions } from '../../_actions';

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
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
	uploaData: { display: 'none !important' },
}));

const LandingPage = props => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom>
							MambaML Home Page
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Landing Page{' '}
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

const connectedHomePage = connect(mapStateToProps)(LandingPage);
export { connectedHomePage as LandingPage };
