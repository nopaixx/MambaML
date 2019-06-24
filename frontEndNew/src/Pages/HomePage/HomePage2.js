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

const handleUploadData = () => {
	const fileupload = document.getElementById('uploadData-input');
	fileupload.click();
};

const HomePage2 = props => {
	const classes = useStyles();
	const [selectedTab, setTab] = useState(0);

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

	const handleTabsChange = (e, newValue) => {
		setTab(newValue);
	};
	const datasets = [
		{ name: 'dateset1' },
		{ name: 'dateset2' },
		{ name: 'dateset3' },
		{ name: 'dateset4' },
	];
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
							paragraph
						/>
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
									<input
										id='uploadData-input'
										className={classes.uploaData}
										type='file'
									/>
									<Button
										onClick={handleUploadData}
										variant='outlined'
										color='primary'>
										Upload dataset
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Tabs
					value={selectedTab}
					onChange={handleTabsChange}
					indicatorColor='primary'
					textColor='primary'
					centered>
					<Tab label='Projects' />
					<Tab label='DataSets' />
				</Tabs>
				<Container className={classes.cardGrid} maxWidth='md'>
					{selectedTab === 0 ? (
						<Grid container spacing={4}>
							<ProjectsCards projects={projects} />
						</Grid>
					) : (
						<Grid container spacing={4}>
							<ProjectsCards projects={datasets} />
						</Grid>
					)}
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
