import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(5),
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

function MadeWithLove() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Built with love by the '}
			<Link color='inherit' href='#'>
				BlahBlah
			</Link>
			{' team.'}
		</Typography>
	);
}

const footers = [
	{
		title: 'Company',
		description: ['Team', 'History', 'Contact us', 'Locations'],
	},
	{
		title: 'Features',
		description: [
			'Cool stuff',
			'Random feature',
			'Team feature',
			'Developer stuff',
			'Another one',
		],
	},
	{
		title: 'Resources',
		description: [
			'Resource',
			'Resource name',
			'Another resource',
			'Final resource',
		],
	},
	{
		title: 'Legal',
		description: ['Privacy policy', 'Terms of use'],
	},
];

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<Container maxWidth='md' component='footer' className={classes.footer}>
			<Grid container spacing={4} justify='space-evenly'>
				{footers.map(footer => (
					<Grid item xs={6} sm={3} key={footer.title}>
						<Typography variant='h6' color='textPrimary' gutterBottom>
							{footer.title}
						</Typography>
						<ul>
							{footer.description.map(item => (
								<li key={item}>
									<Link href='#' variant='subtitle1' color='textSecondary'>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</Grid>
				))}
			</Grid>
			<Box mt={5}>
				<MadeWithLove />
			</Box>
		</Container>
	);
}
