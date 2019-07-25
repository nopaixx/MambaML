import React, { useState, useEffect } from 'react';
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
				setColSelected(columnList);
			}
		} else {
			setColSelected(columnList);
			handleDataGeneration(columnList);
		}
	};
	const handleDataGeneration = columnList => {
		columnList.map(dataColumn => {
			return columnList.map((dataColumn2, key) => {
				const xData = Object.values(parsedData[dataColumn]);
				const yData = Object.values(parsedData[dataColumn2]);
				const data = generateDataPoints(xData, yData, 0);
				selectedColsCB(columnList, data);
			});
		});
	};

	const parsedData = JSON.parse(portDataPreview.first100);
	const dataColumns = Object.values(Object.keys(parsedData));
	//handleDataGeneration();
	return (
		<ColumnSelectorInput
			selectedCols={selectedCols}
			setColSelected={handleSelectedColumn}
			inputColumns={dataColumns}
		/>
	);
};
