import { cloneDeep, mapValues } from 'lodash';
import * as React from 'react';
import { FlowChart } from '@gonzalo10/react-diagrams/';
import * as actions from '@gonzalo10/react-diagrams/src/container/actions';
import { Page } from './Page';
import { chartSimple } from './chartSimple';

export class InternalReactState extends React.Component {
	state = cloneDeep(chartSimple);

	render() {
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			this.setState(func(...args));
		});
		return (
			<Page>
				<FlowChart chart={chart} callbacks={stateActions} />
			</Page>
		);
	}
}
