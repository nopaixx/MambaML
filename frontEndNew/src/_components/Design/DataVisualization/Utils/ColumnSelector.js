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
	const parsedData = JSON.parse(portDataPreview.first100);
	const dataColumns = Object.values(Object.keys(parsedData));

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
		let data;
		for (let i = 0; i < columnList.length; i = i + 2) {
			const xRawData = parsedData[columnList[i]];
			const yRawData = parsedData[columnList[i + 1]];
			if (xRawData && yRawData) {
				const xData = Object.values(xRawData);
				const yData = Object.values(yRawData);
				data = generateDataPoints(xData, yData, 0);
			}
		}
		if (columnList.length === maxNumberCols) selectedColsCB(columnList, data);
	};

	return (
		<ColumnSelectorInput
			selectedCols={selectedCols}
			setColSelected={handleSelectedColumn}
			inputColumns={dataColumns}
		/>
	);
};
