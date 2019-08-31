import React, { useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions/project.actions';
import GridLayout from 'react-grid-layout';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './DashboardChart';
import EndpointCharts from './EndpointCharts';
import Deposits from './Deposits';
import Endpoints from './Endpoints';
import { Projects } from './Projects';
import { Datasets } from './Datasets';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));

var layout = [
	{ i: 'a', x: 0, y: 0, w: 1, h: 2 },
	{ i: 'b', x: 0, y: 1, w: 1, h: 2, minW: 2, maxW: 4 },
	{ i: 'c', x: 0, y: 2, w: 1, h: 2 },
];

const Dashboard = ({ dispatch, projects }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	useEffect(() => {
		dispatch(projectActions.getAllProjects());
	}, []);
	const handleDrawerClose = () => {
		setOpen(!open);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	console.log(projects);
	return (
		<div className={classes.root}>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
			<div>
				<GridLayout
					className='layout'
					layout={layout}
					cols={2}
					rowHeight={30}
					width={1200}
					onLayoutChange={e => console.log('layoutChange', e)}
					onDragStart={e => console.log('dragstart', e)}>
					<Paper key='a' className={fixedHeightPaper}>
						<Endpoints />
					</Paper>
					<Paper key='b' className={fixedHeightPaper}>
						<Endpoints />
					</Paper>
					<Paper key='c' className={fixedHeightPaper}>
						<Endpoints />
					</Paper>
				</GridLayout>
			</div>
			<main className={classes.content}>
				<Container maxWidth='lg' className={classes.container}>
					<Grid container spacing={3}>
						{/* Chart */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Endpoints />
							</Paper>
						</Grid>
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<EndpointCharts />
							</Paper>
						</Grid>
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Chart />
							</Paper>
						</Grid>
						{/* Recent Deposits */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Deposits />
							</Paper>
						</Grid>
						{/* Recent Orders */}
						{console.log(projects)}
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Projects projects={projects} />
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Datasets projects={projects} />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
};

function mapStateToProps(state) {
	const { projects } = state.project;
	return {
		projects,
	};
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
