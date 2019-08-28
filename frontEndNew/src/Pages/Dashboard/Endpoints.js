import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	depositContext: {
		flex: 1,
	},
});

export default function EndpointCharts() {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<Title>Endpoints Usage</Title>
			<Typography component='p' variant='h5'>
				5,024,906 req./day
			</Typography>
			<Title>Endpoints Errors </Title>
			<Typography component='p' variant='h5'>
				200 err./day
			</Typography>
			<div>
				<Link color='primary' href=''>
					View errors
				</Link>
			</div>
		</div>
	);
}
