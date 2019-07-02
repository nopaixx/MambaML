import * as React from 'react';
import { cloneDeep, mapValues } from 'lodash';

import styled from 'styled-components';
import { FlowChart } from '@gonzalo10/react-diagrams/';
import { Page } from './Page';
import { Content } from './Content';
import { Sidebar } from './SideBar/Sidebar';
import * as actions from '@gonzalo10/react-diagrams/src/container/actions';
import { projectActions } from '../../_actions';

import { NodeCustom } from './NodeCustom';
import { LinksCustom } from './LinksCustom';
import { CanvasCustom } from './CanvasCustom';
import TreeMenu from './TreeMenu/TreeMenu';

import { chartSimple } from './chartSimple';
import { SidebarClassifier } from './SideBar/SidebarClassifier';
import { BoxInfo } from './BoxInfo';
import { Button } from '../Utils/Button/Button';
import IconButton from '@material-ui/core/IconButton';

// import ResizableBox from '../Utils/Resize/ResizableBox';
import { ResizableBox } from 'react-resizable';
import './DesignComponent.css';

Object.compare = function(obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

		switch (typeof obj1[p]) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (
					typeof obj2[p] == 'undefined' ||
					(p != 'compare' && obj1[p].toString() != obj2[p].toString())
				)
					return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}

	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof obj1[p] == 'undefined') return false;
	}
	return true;
};

export class DragDropState extends React.Component {
	state = cloneDeep(chartSimple);

	componentDidMount() {
		const chart = this.props.project.chartStructure;
		console.log('chart to load', chart);
		if (chart) {
			this.setState(cloneDeep(chart));
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { dispatch } = this.props;
		dispatch(projectActions.updateChartStructure(this.state));
	}

	runBoxCode = id => {
		const { runBox } = this.props;
		runBox(id);
	};

	render() {
		const { actors, updateBoxInfo } = this.props;
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			this.setState(func(...args));
		});
		if (!actors) {
			return null;
		}
		var h = window.innerHeight;
		const { projectStatus } = this.props;
		if (!chart) {
			return null;
		}
		return (
			<React.Fragment>
				<Page>
					<ResizableBox
						className='box'
						width={100}
						height={h}
						axis='x'
						handle={<span className='custom-handle custom-handle-se' />}>
						<TreeMenu data={actors} />
					</ResizableBox>
					<Content>
						<div id={'flowchartCanvas'}>
							<FlowChart
								chart={chart}
								callbacks={stateActions}
								Components={{
									NodeInner: props =>
										NodeCustom(props, this.runBoxCode, projectStatus),
									Link: props => LinksCustom(props, stateActions),
									CanvasOuter: CanvasCustom,
								}}
							/>
						</div>
					</Content>
					{/* <ResizableBox
						className='box'
						width={100}
						height={h}
						axis='x'
						resizeHandles={['sw']}
						handle={<span className='custom-handle custom-handle-sw' />}>
						<BoxInfo
							chart={chart}
							boxActions={stateActions}
							updateBox={updateBoxInfo}
						/>
					</ResizableBox> */}

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
