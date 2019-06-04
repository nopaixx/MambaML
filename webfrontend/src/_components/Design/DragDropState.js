import * as React from 'react';
import { cloneDeep, mapValues } from 'lodash';

import styled from 'styled-components';
import { FlowChart } from '@mrblenny/react-flow-chart/';
import { Page } from './Page';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import * as actions from '@mrblenny/react-flow-chart/src/container/actions';

import { SidebarItem } from './SidebarItem';
import { chartSimple } from './chartSimple';

export class DragDropState extends React.Component {
	state = cloneDeep(chartSimple);

	render() {
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			this.setState(func(...args));
		});
		return (
			<Page>
				{console.log('state', chart)}
				<Content>
					<FlowChart chart={chart} callbacks={stateActions} />
				</Content>
				<Sidebar>
					<SidebarItem
						onClick={e => console.log(e)}
						type="Data"
						ports={{
							port1: {
								id: 'port1',
								type: 'bottom',
								properties: {
									custom: 'property',
								},
							},
						}}
						properties={{
							payload: 'dataset1',
							custom: 'property',
						}}
					/>
					<SidebarItem
						type="Model"
						ports={{
							port1: {
								id: 'port1',
								type: 'bottom',
								properties: {
									custom: 'property',
								},
							},
						}}
					/>
					<SidebarItem
						type="Endpoint"
						ports={{
							port1: {
								id: 'port1',
								type: 'left',
								properties: {
									custom: 'property',
								},
							},
							port2: {
								id: 'port2',
								type: 'right',
								properties: {
									custom: 'property',
								},
							},
						}}
					/>
				</Sidebar>
			</Page>
		);
	}
}
