import React from 'react';

import MambaLogo from '../../logo_peque.png';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import { chartSimple } from './chartSimple';
import { DragAndDropSidebar } from './DragAndDrop';
import { ExternalReactState } from './ExternalReactState';
import { InternalReactState } from './InternalReactState';
import { CustomNodeInnerDemo } from './NodeCustom';
import { DragDropState } from './DragDropState';

class DesignComponent extends React.Component {
	render() {
		return (
			<React.Fragment>
				<img src={MambaLogo} />

				{/* <DragAndDropSidebar /> */}
				{/* <ExternalReactState /> */}
				{/* <InternalReactState /> */}
				<DragDropState />
				{/* <CustomNodeInnerDemo /> */}
				{/* <FlowChartWithState initialValue={chartSimple} /> */}
			</React.Fragment>
		);
	}
}

export default DesignComponent;
