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

export class DragDropState extends React.Component {
	state = cloneDeep(chartSimple);

	componentDidMount() {
		const chart = this.props.project.chartStructure;
		this.setState(cloneDeep(chart));
	}
	componentDidUpdate() {
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
									NodeInner: props => NodeCustom(props, this.runBoxCode),
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
