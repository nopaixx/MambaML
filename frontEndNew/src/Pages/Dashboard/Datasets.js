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

const datasets = [
	{ name: 'dateset1', id: 1, size: 100, format: 'csv', desc: 'very good' },
	{ name: 'dateset2', id: 2, size: 100, format: 'csv', desc: 'very good' },
	{ name: 'dateset3', id: 3, size: 100, format: 'csv', desc: 'very good' },
	{ name: 'dateset4', id: 4, size: 100, format: 'csv', desc: 'very good' },
];

export const Datasets = ({}) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Title>Datasets</Title>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Size</TableCell>
						<TableCell>Format</TableCell>
						<TableCell>Desc.</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{datasets &&
						datasets.map(dataset => (
							<TableRow key={dataset.id} onClick={() => alert(dataset.id)}>
								<TableCell>{dataset.id}</TableCell>
								<TableCell>{dataset.name}</TableCell>
								<TableCell>{dataset.size}</TableCell>
								<TableCell>{dataset.format}</TableCell>
								<TableCell>{dataset.desc}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<div className={classes.seeMore}>
				<Link color='primary' href='javascript:;'>
					See more Datasets
				</Link>
			</div>
		</React.Fragment>
	);
};
