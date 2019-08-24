import React from 'react';

import OutputTable from '../Table/OutputTable';

export const OutputSelector = ({ data, setOutputState }) => {
	return (
		<div className={'param-selector-wrapper'}>
			<div className={'table-wrapper'}>
				<OutputTable updateBoxState={setOutputState} data={data} />
			</div>
		</div>
	);
};
