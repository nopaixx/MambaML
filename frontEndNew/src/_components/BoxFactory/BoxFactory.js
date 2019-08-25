import React, { useState } from 'react';

import { BoxFactoryNormal } from './BoxFactoryNormal';
import { BoxFactoryWizard } from './BoxFactoryWizard';

import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	IconRow: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	icon: {
		margin: theme.spacing(2),
		fontSize: 30,
		'&:hover': {
			color: theme.palette.primary.main,
			cursor: 'pointer',
		},
	},
}));

export const BoxFactory = () => {
	const classes = useStyles();
	const [isWizardActive, setWizardActive] = useState(false);
	return (
		<>
			<div className={classes.IconRow}>
				<Icon className={classes.icon} onClick={() => setWizardActive(false)}>
					table_chart
				</Icon>
				<Icon className={classes.icon} onClick={() => setWizardActive(true)}>
					view_carousel
				</Icon>
			</div>
			{isWizardActive ? <BoxFactoryWizard /> : <BoxFactoryNormal />}
		</>
	);
};
