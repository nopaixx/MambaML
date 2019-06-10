import { cloneDeep, mapValues } from 'lodash';
import * as React from 'react';
import ReactJson from 'react-json-view';
import { FlowChart } from '@mrblenny/react-flow-chart/';
import * as actions from '@mrblenny/react-flow-chart/src/container/actions';
import { Page } from './Page';
import { chartSimple } from './chartSimple';
import { throttleRender } from './throttleRender';

const ReactJsonThrottled = throttleRender(200)(ReactJson);

export class ExternalReactState extends React.Component {
	state = cloneDeep(chartSimple);

	render() {
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			this.setState(func(...args));
		});
		return (
			<Page>
				<FlowChart chart={chart} callbacks={stateActions} />
				<ReactJsonThrottled
					src={chart}
					enableClipboard={false}
					style={{ overflowY: 'scroll', width: '400px' }}
				/>
			</Page>
		);
	}
}
