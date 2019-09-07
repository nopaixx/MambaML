import React, { useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions/project.actions';
import GridLayout from 'react-grid-layout';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MainListItems } from './listItems';
import Chart from './DashboardChart';
import AreaChart from './AreaChart';
import EndpointCharts from './EndpointCharts';
import BrushBarChart from './BrushBarChart';
import SimpleChartBar from './SimpleChartBar';
import Deposits from './Deposits';
import Endpoints from './Endpoints';
import { Projects } from './Projects';
import { Datasets } from './Datasets';
import MambaLogo from '../../Assets/Images/logo_peque.png';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		backgroundColor: theme.palette.primary.light,
	},
	dashboard: {
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
		top: 0,
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
	logo: { width: 70, cursor: 'pointer' },
	icon: {
		height: 50,
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dashboardWrapper: {
		position: 'absolute',
		backgroundColor: theme.palette.primary.light,
	},
}));

var layout = [
	{ i: 'EndpointCharts', x: 0, y: 0, w: 4, h: 7 },
	{ i: 'b', x: 4, y: 0, w: 4, h: 7 },
	{ i: 'c', x: 8, y: 0, w: 2, h: 7 },
	{ i: 'h', x: 0, y: 1, w: 4, h: 7 },
	{ i: 'i', x: 4, y: 1, w: 4, h: 7 },
	{ i: 'j', x: 8, y: 1, w: 2, h: 7 },
	{ i: 'd', x: 0, y: 2, w: 4, h: 7 },
	{ i: 'k', x: 4, y: 2, w: 4, h: 7 },
	{ i: 'e', x: 8, y: 2, w: 2, h: 7 },
	{ i: 'f', x: 0, y: 3, w: 10, h: 8 },
	{ i: 'g', x: 0, y: 4, w: 10, h: 7 },
];

const Dashboard = ({ dispatch, projects }) => {
	const classes = useStyles();
	const [dashboardSize, setDashboardSize] = React.useState(1000);
	useEffect(() => {
		dispatch(projectActions.getAllProjects());
		const size = window.innerWidth - 80;
		setDashboardSize(size);
	}, [dispatch]);
	window.onresize = e => {
		setDashboardSize(e.target.innerWidth - 80);
	};

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<div className={classes.root}>
			<div
				className={classes.dashboard}
				id={'dashboard'}
				style={{
					width: dashboardSize,
					marginLeft: 80,
					marginTop: 30,
				}}>
				<GridLayout
					margin={[30, 30]}
					className='layout'
					layout={layout}
					cols={10}
					rowHeight={15}
					width={dashboardSize}>
					<Paper key='EndpointCharts' className={fixedHeightPaper}>
						<EndpointCharts />
					</Paper>
					<Paper key='b' className={fixedHeightPaper}>
						<BrushBarChart />
					</Paper>
					<Paper key='c' className={fixedHeightPaper}>
						<Endpoints />
					</Paper>
					<Paper key='h' className={fixedHeightPaper}>
						<AreaChart />
					</Paper>
					<Paper key='i' className={fixedHeightPaper}>
						<SimpleChartBar />
					</Paper>
					<Paper key='j' className={fixedHeightPaper}>
						<Endpoints />
					</Paper>
					<Paper key='d' className={fixedHeightPaper}>
						<Chart />
					</Paper>
					<Paper key='k' className={fixedHeightPaper}>
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
				</GridLayout>
			</div>
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
