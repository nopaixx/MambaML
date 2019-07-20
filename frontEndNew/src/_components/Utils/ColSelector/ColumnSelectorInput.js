import React from 'react';

import { useStyles } from '../Parameters/Styles';

export const ColumnSelectorInput = ({
	inputColumns,
	setColSelected,
	selectedCols,
}) => {
	const classes = useStyles();

	const checkIfColIsSelected = col => {
		if (selectedCols.includes(col)) {
			setColSelected(selectedCols.filter(item => item !== col));
		} else {
			setColSelected([...selectedCols, col]);
		}
	};
	return (
		<div className={classes.gridInputs}>
			{inputColumns.map((col, key) => {
				return (
					<div
						key={key}
						onClick={() => checkIfColIsSelected(col)}
						className={
							selectedCols.includes(col)
								? classes.selectedItem
								: classes.gridItem
						}>
						{col}
					</div>
				);
			})}
		</div>
	);
};
