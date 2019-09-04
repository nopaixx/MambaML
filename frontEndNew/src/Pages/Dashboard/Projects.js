/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles(theme => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export const Projects = ({ projects }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Title>Projects</Title>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Created by</TableCell>
						<TableCell>Backend V</TableCell>
						<TableCell>Frontend V</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects &&
						projects.map(project => (
							<TableRow key={project.id}>
								<TableCell>{project.id}</TableCell>
								<TableCell>{project.name}</TableCell>
								<TableCell>{project.user_id}</TableCell>
								<TableCell>{project.backendVersion}</TableCell>
								<TableCell>{project.frontendVersion}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<div className={classes.seeMore}>
				<Link color='primary' href='javascript:;'>
					See more projects
				</Link>
			</div>
		</React.Fragment>
	);
};
