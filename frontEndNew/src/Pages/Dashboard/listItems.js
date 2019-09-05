import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../_helpers';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
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
}));

export const MainListItems = () => {
	const classes = useStyles();

	return (
		<ul className={classes.list}>
			<ListItem button className={classes.icons}>
				<Tooltip title='Dashboard' placement='right'>
					<DashboardIcon color='primary' fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem
				button
				className={classes.icons}
				onClick={() => history.push('/projects')}>
				<Tooltip title='Projects' placement='right'>
					<MemoryIcon color='secondary' fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem button className={classes.icons}>
				<Tooltip title='People' placement='right'>
					<PeopleIcon color='third' fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem button className={classes.icons}>
				<Tooltip title='Stats' placement='right'>
					<BarChartIcon color='four' fontSize='large' />
				</Tooltip>
			</ListItem>
			<ListItem button className={classes.icons}>
				<Tooltip title='Datasets' placement='right'>
					<LayersIcon fontSize='large' />
				</Tooltip>
			</ListItem>
		</ul>
	);
};
