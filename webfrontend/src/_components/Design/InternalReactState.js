import { cloneDeep, mapValues } from 'lodash';
import * as React from 'react';
import { FlowChart } from '@mrblenny/react-flow-chart/';
import * as actions from '@mrblenny/react-flow-chart/src/container/actions';
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
				{console.log('this.state', chart)}
				<FlowChart chart={chart} callbacks={stateActions} />
			</Page>
		);
	}
}
