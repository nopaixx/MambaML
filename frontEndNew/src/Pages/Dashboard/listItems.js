import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../_helpers';
import ListItem from '@material-ui/core/ListItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MemoryIcon from '@material-ui/icons/Memory';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
	icons: {
		justifyContent: 'center',
	},
	list: {
		padding: 'initial',
		marginTop: 30,
	},
	selected: {
		justifyContent: 'center',
		backgroundColor: theme.palette.primary.light,
	},
}));

export const MainListItems = ({ url }) => {
	const classes = useStyles();
	return (
		<ul className={classes.list}>
			<ListItem
				button
				className={url.includes('dashboard') ? classes.selected : classes.icons}
				onClick={() => history.push('/dashboard')}>
				<Tooltip title='Dashboard' placement='right'>
					<DashboardIcon color='primary' fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem
				button
				className={url.includes('projects') ? classes.selected : classes.icons}
				onClick={() => history.push('/projects')}>
				<Tooltip title='Projects' placement='right'>
					<MemoryIcon color='secondary' fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem button className={classes.icons}>
				<Tooltip title='People' placement='right'>
					<PeopleIcon fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem button className={classes.icons}>
				<Tooltip title='Stats' placement='right'>
					<BarChartIcon fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem
				button
				className={url.includes('datasets') ? classes.selected : classes.icons}
				onClick={() => history.push('/datasets')}>
				<Tooltip title='Datasets' placement='right'>
					<LayersIcon fontSize='large' />
				</Tooltip>
			</ListItem>
		</ul>
	);
};
