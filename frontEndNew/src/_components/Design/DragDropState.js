import * as React from 'react';
import { cloneDeep, mapValues } from 'lodash';

import styled from 'styled-components';
import { FlowChart } from '@mrblenny/react-flow-chart/';
import { Page } from './Page';
import { Content } from './Content';
import { Sidebar } from './SideBar/Sidebar';
import * as actions from '@mrblenny/react-flow-chart/src/container/actions';

import { NodeCustom } from './NodeCustom';
import { LinksCustom } from './LinksCustom';
import { CanvasCustom } from './CanvasCustom';

import { chartSimple } from './chartSimple';
import { SidebarClassifier } from './SideBar/SidebarClassifier';
import { BoxInfo } from './BoxInfo';
import { Button } from '../Utils/Button/Button';

export class DragDropState extends React.Component {
	state = cloneDeep(chartSimple);

	componentDidMount() {
		const chart = this.props.project.chartStructure;
		this.setState(cloneDeep(chart));
	}
	render() {
		const { actors, onSaveProject, updateBoxInfo } = this.props;
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			// if (args && args[0]) {
			// 	console.log('args', args[0]);
			// } else {
			// 	this.setState(func(...args));
			// }
			// let fromPort;
			// let toPort;
			// if (chart.nodes[args[0].fromNodeId]) {
			// 	fromPort = chart.nodes[args[0].fromNodeId].ports[args[0].fromPortId];
			// } else {
			// 	this.setState(func(...args));
			// }
			// if (chart.nodes[args[0].toNodeId]) {
			// 	toPort = chart.nodes[args[0].toNodeId].ports[args[0].toPortId];
			// } else {
			// 	this.setState(func(...args));
			// }
			// if (fromPort && toPort) {
			// 	if (fromPort.type === toPort.type) {
			// 		console.log('they are the same###########');
			// 		console.log('Gonzalo', actions.onLinkComplete(args[0].linkId));
			// 		this.setState(func(...args));
			// 	} else {
			// 		this.setState(func(...args));
			// 	}
			// } else {
			this.setState(func(...args));
			// }
		});
		if (!actors) {
			return null;
		}
		return (
			<React.Fragment>
				<Button label={'save'} onClick={() => onSaveProject(chart)} />
				<Page>
					<Sidebar>
						<SidebarClassifier sidebarItemList={actors} />
					</Sidebar>
					<Content>
						<div id={'flowchartCanvas'}>
							<FlowChart
								chart={chart}
								callbacks={stateActions}
								Components={{
									NodeInner: NodeCustom,
									Link: props => LinksCustom(props, stateActions),
									CanvasOuter: CanvasCustom,
								}}
							/>
						</div>
					</Content>
					<BoxInfo
						chart={chart}
						boxActions={stateActions}
						updateBox={updateBoxInfo}
					/>
				</Page>
			</React.Fragment>
		);
	}
}
