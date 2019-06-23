import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { projectActions } from '../../_actions';

function MadeWithLove() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Built with love by the '}
			<Link color='inherit' to='https://material-ui.com/'>
				Material-UI
			</Link>
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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ProjectsCards = ({ projects }) => {
	const classes = useStyles();

	if (!projects) {
		return null;
	}
	return projects.map((project, key) => {
		return (
			<Grid item key={project} xs={12} sm={6} md={4}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image='https://source.unsplash.com/800x450/?artificial-intelligence'
						title='Image title'
					/>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant='h5' component='h2'>
							{project.name}
						</Typography>
						<Typography>
							This is a media card. You can use this section to describe the
							content.
						</Typography>
					</CardContent>
					<CardActions>
						<Link to={`/project/${project.id}`}>Load Project</Link>
						<Button size='small' color='primary'>
							View
						</Button>
						<Button size='small' color='primary'>
							Edit
						</Button>
					</CardActions>
				</Card>
			</Grid>
		);
	});
};

const HomePage2 = props => {
	const classes = useStyles();
	const { projects } = props;

	console.log('projects', props);

	useEffect(() => {
		const { dispatch } = props;
		dispatch(projectActions.getAllProjects());
	}, []);

	const handleCreateProject = () => {
		const { dispatch } = props;
		dispatch(
			projectActions.create(`Project ${Math.random()}`, '{}', 'V1', 'V1')
		);
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom>
							Album layout
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Something short and leading about the collection below—its
							contents, the creator, etc. Make it short and sweet, but not too
							short so folks don&apos;t simply skip over it entirely.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify='center'>
								<Grid item>
									<Button
										onClick={handleCreateProject}
										variant='contained'
										color='primary'>
										Create project
									</Button>
								</Grid>
								<Grid item>
									<Button variant='outlined' color='primary'>
										Secondary action
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth='md'>
					{/* End hero unit */}
					<Grid container spacing={4}>
						<ProjectsCards projects={projects} />
					</Grid>
				</Container>
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

const connectedHomePage = connect(mapStateToProps)(HomePage2);
export { connectedHomePage as HomePage2 };
