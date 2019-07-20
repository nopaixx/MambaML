import React from 'react';

import { useStyles } from '../Parameters/Styles';

export const ControlPanel = ({ setColSelected, inputColumns }) => {
	const classes = useStyles();
	return (
		<div className={classes.controlItems}>
			<div
				className={classes.controlItem}
				onClick={() => setColSelected(inputColumns)}>
				Select All
			</div>

			<div className={classes.controlItem} onClick={() => setColSelected([])}>
				Exclue All
			</div>
		</div>
	);
};
