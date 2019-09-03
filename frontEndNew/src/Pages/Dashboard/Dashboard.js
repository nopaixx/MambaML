import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions/project.actions';
// import GridLayout from 'react-grid-layout';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

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
	dashboard: {
		position: 'absolute',
		backgroundColor: theme.palette.primary.light,
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
	{ i: 'a', x: 0, y: 0, w: 4, h: 7 },
	{ i: 'b', x: 4, y: 0, w: 4, h: 7 },
	{ i: 'c', x: 8, y: 0, w: 2, h: 7 },
	{ i: 'd', x: 4, y: 1, w: 2, h: 7 },
	{ i: 'e', x: 0, y: 2, w: 6, h: 10 },
	{ i: 'f', x: 0, y: 3, w: 10, h: 10 },
	{ i: 'g', x: 0, y: 3, w: 10, h: 10 },
];

const Dashboard = ({ dispatch, projects }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [dashboardSize, setDashboardSize] = React.useState(500);
	const [drawerSize, setDrawerSize] = React.useState(72);
	const updateDivSize = isOpen => {
		if (isOpen) {
			setDashboardSize(dashboardSize - 168);
			setDrawerSize(240);
		} else {
			setDashboardSize(dashboardSize + 168);
			setDrawerSize(72);
		}
	};

	useEffect(() => {
		dispatch(projectActions.getAllProjects());
		const size = window.innerWidth - 92;
		setDashboardSize(size);
	}, [dispatch]);
	const handleDrawerClose = () => {
		setOpen(!open);
		updateDivSize(!open);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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

			<div
				className={classes.dashboard}
				id={'dashboard'}
				style={{
					width: dashboardSize,

					left: drawerSize,
				}}>
				<ResponsiveGridLayout
					className='layout'
					// layout={layout}
					// cols={10}
					// rowHeight={30}
					// width={dashboardSize}
					// onLayoutChange={e => console.log('layoutChange', e)}
					// onDragStart={e => console.log('dragstart', e)}
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
					<Paper
						key='10'
						className={fixedHeightPaper}
						data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
						<EndpointCharts />
					</Paper>
					<Paper
						key='10'
						className={fixedHeightPaper}
						data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
						<EndpointCharts />
					</Paper>
					<Paper key='10' className={fixedHeightPaper}>
						<Endpoints />
					</Paper>
					<Paper key='10' className={fixedHeightPaper}>
						<Chart />
					</Paper>
					<Paper key='e' className={fixedHeightPaper}>
						<Deposits />
					</Paper>
					<Paper key='f' className={fixedHeightPaper}>
						<Projects projects={projects} />
					</Paper>
					<Paper key='g' className={fixedHeightPaper}>
						<Datasets projects={projects} />
					</Paper>
				</ResponsiveGridLayout>
			</div>
			{/* <main className={classes.content}>
				<Container maxWidth='lg' className={classes.container}>
					<Grid container spacing={3}>
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
						
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Deposits />
							</Paper>
						</Grid>
						
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
			</main> */}
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
