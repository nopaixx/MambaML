import React, { useState } from 'react';
import { useStyles } from '../Styles';

import { ColumnSelectorInput } from '../../../Utils/ColSelector/ColumnSelectorInput';
import { generateDataPoints } from '../Scatter/generateDataPoints';

export const ColumnSelector = ({
	portDataPreview,
	maxNumberCols = 2,
	selectedColsCB,
}) => {
	const classes = useStyles();
	const [selectedCols, setColSelected] = useState([]);
	const handleSelectedColumn = columnList => {
		if (selectedCols.length >= maxNumberCols) {
			if (columnList.length < selectedCols.length) {
			}
		} else {
			setColSelected(columnList);
		}
	};
	const handleDataGeneration = (xData, yData) => {
		const data = generateDataPoints(xData, yData, 0);
		selectedColsCB(selectedCols, data);
	};
	const parsedData = JSON.parse(portDataPreview.first100);
	const dataColumns = Object.values(Object.keys(parsedData));
	return (
		<div>
			<ColumnSelectorInput
				selectedCols={selectedCols}
				setColSelected={handleSelectedColumn}
				inputColumns={dataColumns}
			/>

			<div className={classes.scatterGroup}>
				{selectedCols.length > 4 && <div>You can only select 4</div>}
				{selectedCols.map(dataColumn => {
					return selectedCols.map((dataColumn2, key) => {
						const xData = Object.values(parsedData[dataColumn]);
						const yData = Object.values(parsedData[dataColumn2]);
						handleDataGeneration(xData, yData);
					});
				})}
			</div>
		</div>
	);
};
