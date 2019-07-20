import React, { useState } from 'react';

import ParametersTable from '../Table/ParametersTable';

import { CsvSelector } from '../DatasetSelector/CsvSelector';
import { ColSelector } from '../ColSelector/ColSelector';

export const ParamsSelector = ({
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
					<CsvSelector
						isCsvSelectorActive={isCsvSelectorActive}
						selectedDataset={selectedDataset}
						specialParamSelector={specialParamSelector}
					/>
					<ColSelector
						isColSelectorOpen={isColSelectorOpen}
						setColSelectorStatus={setColSelectorStatus}
						selectedColsInfo={selectedColsInfo}
						specialParamSelector={specialParamSelector}
						nodeInfo={nodeInfo}
						chartInfo={chartInfo}
					/>
					<ParametersTable
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
					<ParametersTable
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
