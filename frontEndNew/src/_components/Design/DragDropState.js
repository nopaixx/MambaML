import * as React from 'react';
import { cloneDeep, mapValues } from 'lodash';

import { FlowChart } from '@gonzalo10/react-diagrams/';
import { Page } from './Page';
import { Content } from './Content';
import * as actions from '@gonzalo10/react-diagrams/src/container/actions';
import { projectActions } from '../../_actions';

import { NodeCustom } from './NodeCustom';
import { LinksCustom } from './LinksCustom';
import { CanvasCustom } from './CanvasCustom';
import TreeMenu from './TreeMenu/TreeMenu';

import { BoxInfo } from './BoxInfo';
import _ from 'lodash';

// import ResizableBox from '../Utils/Resize/ResizableBox';
import { ResizableBox } from 'react-resizable';
import './DesignComponent.css';
import { whileStatement } from '@babel/types';

export class DragDropState extends React.Component {
	state = {
		offset: {
			x: 0,
			y: 0,
		},
		nodes: {},
		links: {},
		selected: {},
		hovered: {},
	};

	componentDidMount() {
		const chart = this.props.project.chartStructure;
		if (chart) {
			this.setState(cloneDeep(chart));
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.project.chartStructure !== prevProps.project.chartStructure
		) {
			this.setState(cloneDeep(this.props.project.chartStructure));
		}
	}

	checkIfNodeHasChange = (func, args) => {
		let hasChange = false;
		if (func.name === 'onLinkComplete') {
			const fromNode = args[0].fromNodeId;
			const toNode = args[0].toNodeId;
			const nodes = {
				...this.state.nodes,
			};
			if (fromNode === toNode) {
				console.log('Same node Connected');
			} else {
				nodes[toNode].properties.payload.hasChange = true;
				this.setState({ nodes });

				hasChange = true;
			}
		}
		if (func.name === 'onLinkCancel') {
			const selectedLink = this.state.links[args[0].linkId];
			const fromNode = selectedLink.from.nodeId;
			const toNode = selectedLink.to.nodeId;
			const nodes = {
				...this.state.nodes,
			};
			nodes[toNode].properties.payload.hasChange = true;
			this.setState({ nodes });
			hasChange = true;
		}
		if (hasChange) {
			if (this.state) {
				this.updateProjectChart();
			}
		}
	};
	checkIfProjectHasChange = (func, args) => {
		switch (func.name) {
			case 'onDeleteKey':
			case 'onCanvasDrop':
				this.updateProjectChart();
				break;
			default:
				break;
		}
	};

	updateProjectChart = () => {
		const { dispatch } = this.props;
		dispatch(projectActions.updateChartStructure(this.state));
	};

	runBoxCode = id => {
		const { runBox } = this.props;
		runBox(id);
	};

	stateActions = mapValues(actions, func => (...args) => {
		this.checkIfNodeHasChange(func, args);
		this.checkIfProjectHasChange(func, args);
		this.setState(func(...args));
	});

	render() {
		const { actors, updateBoxInfo, projectStatus, boxesStatus } = this.props;
		const chart = this.state;
		var h = window.innerHeight;

		if (!actors) {
			return null;
		}
		return (
			<React.Fragment>
				<Page>
					<div style={{ overflow: 'scroll', maxHeight: '90vh' }}>
						<ResizableBox
							className='box'
							width={100}
							height={h}
							axis='x'
							handle={<span className='custom-handle custom-handle-se' />}>
							<TreeMenu data={actors} />
						</ResizableBox>
					</div>
					{projectStatus === 'running' ||
					(boxesStatus && boxesStatus.project_stat === 'PENDING') ? (
						<div
							onClick={this.handleClickBlockScreen}
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								zIndex: 9999,
								backgroundColor: 'transparent',
								textAlign: 'center',
								fontSize: 26,
								color: 'white',
								fontWeight: 700,
							}}>
							The screen is block until the project finish!!! Sorry :(
						</div>
					) : null}
					<Content>
						<div id={'flowchartCanvas'}>
							<FlowChart
								chart={chart}
								callbacks={this.stateActions}
								Components={{
									NodeInner: props =>
										NodeCustom(
											props,
											this.runBoxCode,
											boxesStatus,
											projectStatus
										),
									Link: props => LinksCustom(props, this.stateActions),
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
						boxActions={this.stateActions}
						updateBox={updateBoxInfo}
						updateProjectChart={this.updateProjectChart}
					/>
				</Page>
			</React.Fragment>
		);
	}
}
