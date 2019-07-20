import React, { useState } from 'react';
import { useStyles } from '../Styles';

import { ColumnSelectorInput } from '../../../Utils/ColSelector/ColumnSelectorInput';
import { generateDataPoints } from './generateDataPoints';
import ScatterPoints from '../../../Utils/Charts/ScatterPoints';

export const ScatterPointsMatrix = ({ portDataPreview }) => {
	const classes = useStyles();
	const [selectedCols, setColSelected] = useState([]);
	const handleSelectedColumn = columnList => {
		if (selectedCols.length > 3) {
			if (columnList.length < selectedCols.length) {
				setColSelected(columnList);
			}
		} else {
			setColSelected(columnList);
		}
	};
	const w = window.innerWidth - window.innerWidth * 0.06;
	const h = window.innerHeight - 200;
	const parsedData = JSON.parse(portDataPreview.first100);
	const dataColumns = Object.values(Object.keys(parsedData));
	const itemWidth = w / 4;
	const itemHeight = h / 4;
	let data;
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
						data = generateDataPoints(xData, yData, 0);
						return (
							<ScatterPoints
								key={key}
								width={itemWidth}
								height={itemHeight}
								dataPoints={data.dataPoints}
								xMaxPos={data.xMax}
								yMaxPos={data.yMax}
								xMinPos={data.xMin}
								yMinPos={data.yMin}
								title={dataColumn + '/' + dataColumn2}
							/>
						);
					});
				})}
			</div>
		</div>
	);
};
