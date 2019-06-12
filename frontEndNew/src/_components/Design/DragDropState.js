import * as React from 'react';
import { cloneDeep, mapValues } from 'lodash';

import styled from 'styled-components';
import { FlowChart, LinkDefault } from '@mrblenny/react-flow-chart/';
import { Page } from './Page';
import { Content } from './Content';
import { Sidebar } from './SideBar/Sidebar';
import * as actions from '@mrblenny/react-flow-chart/src/container/actions';
import { NodeInnerCustom } from './NodeCustom';
import { SidebarItem } from './SideBar/SidebarItem';
import { chartSimple } from './chartSimple';
import { sidebarItemList } from './SideBar/ItemsList';
import { SidebarClassifier } from './SideBar/SidebarClassifier';
import { BoxInfo } from './BoxInfo';
import { Button } from '../Utils/Button/Button';
import { Input } from '../Utils/Input/Input';
const Label = styled.div`
	position: absolute;
`;

const Button2 = styled.div`
	position: absolute;
	top: 0px;
	right: 0px;
	padding: 5px;
	height: 15px;
	width: 15px;
	transform: translate(50%, -50%);
	background: red;
	color: white;
	border-radius: 50%;
	transition: 0.3s ease all;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	cursor: pointer;
	&:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}
`;

const CanvasOuterCustom = styled.div`
	position: relative;
	background-size: 10px 10px;
	background-color:  #d38c8c};
	background-image: linear-gradient(
			90deg,
			hsla(0, 0%, 100%, 0.1) 1px,
			transparent 0
		),
		linear-gradient(180deg, hsla(0, 0%, 100%, 0.1) 1px, transparent 0);
	width: 100%;
	height: 100%;
	overflow: hidden;
	cursor: not-allowed;
`;

export class DragDropState extends React.Component {
	state = cloneDeep(chartSimple);

	render() {
		const { actors, onSaveProject, updateBoxInfo } = this.props;
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			this.setState(func(...args));
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
									NodeInner: NodeInnerCustom,
									Link: props => {
										const { startPos, endPos, onLinkClick, link } = props;
										const centerX = startPos.x + (endPos.x - startPos.x) / 2;
										const centerY = startPos.y + (endPos.y - startPos.y) / 2;
										return (
											<React.Fragment>
												<LinkDefault {...props} />
												<Label style={{ left: centerX, top: centerY }}>
													<Button2
														onClick={e => {
															onLinkClick({ linkId: link.id });
															stateActions.onDeleteKey();
															e.stopPropagation();
														}}>
														x
													</Button2>
												</Label>
											</React.Fragment>
										);
									},
									CanvasOuter: CanvasOuterCustom,
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
