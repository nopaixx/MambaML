import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { projectActions, notificationsActions } from '../../_actions';

const useStyles = makeStyles(theme => ({
	cardGrid: {
		maxWidth: '90vw',
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
	projectsButtonsGroup: {
		display: 'flex',
		justifyContent: 'center',
		padding: 20,
	},
	projectsButton: {
		margin: 10,
	},
}));

const ProjectsCards = ({ projects }) => {
	const classes = useStyles();

	if (!projects) {
		return null;
	}
	return projects.map((project, key) => {
		return (
			<Grid item key={key} xs={12} sm={6} md={4}>
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
						<Button size='small' color='primary'>
							<RouterLink to={`/project/${project.id}`}>
								Load Project
							</RouterLink>
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

const ProjectsPage = props => {
	const classes = useStyles();

	const { projects } = props;

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
			<Container className={classes.cardGrid} maxWidth='md'>
				<div className={classes.projectsButtonsGroup}>
					<Button
						size={'large'}
						className={classes.projectsButton}
						onClick={handleCreateProject}
						variant='contained'
						color='primary'>
						Create project
					</Button>
				</div>

				<Grid className={classes.projectsGrid} container spacing={4}>
					<ProjectsCards projects={projects} />
				</Grid>
			</Container>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	const {
		users,
		authentication: { user },
		project: { projects },
	} = state;
	return {
		user,
		users,
		projects,
	};
}

const connectedHomePage = connect(mapStateToProps)(ProjectsPage);
export { connectedHomePage as ProjectsPage };
