import React, { useState } from 'react';

import OutputTable from '../Table/OutputTable';

export const OutputSelector = ({
	selectedDataset,
	setParamsState,
	dataset,
	data,
	nodeInfo,
	chartInfo,
	selectedCols,
	selectedColsInfo,
}) => {
	const [isCsvSelectorActive, setCsvSelected] = useState(false);
	const [isColSelectorOpen, setColSelectorStatus] = useState(false);
	const specialParamSelector = value => {
		if (value === 'csv') setCsvSelected(!isCsvSelectorActive);
		if (value === 'colselector') setColSelectorStatus(!isCsvSelectorActive);
	};
	if (selectedColsInfo && selectedDataset) {
		return (
			<div className={'param-selector-wrapper'}>
				<div className={'table-wrapper'}>
					<OutputTable
						specialParamSelector={specialParamSelector}
						updateBoxState={setParamsState}
						dataset={dataset}
						selectedCols={selectedCols}
						data={data}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className={'param-selector-wrapper'}>
				<div className={'table-wrapper'}>
					<OutputTable
						specialParamSelector={specialParamSelector}
						updateBoxState={setParamsState}
						dataset={dataset}
						selectedCols={selectedCols}
						data={data}
					/>
				</div>
			</div>
		);
	}
};
