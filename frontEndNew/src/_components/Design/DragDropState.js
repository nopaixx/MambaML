import * as React from 'react';
import { cloneDeep, mapValues } from 'lodash';

import styled from 'styled-components';
import { FlowChart } from '@mrblenny/react-flow-chart/';
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

export class DragDropState extends React.Component {
	state = cloneDeep(chartSimple);

	onClickSave = () => {
		const { saveProject } = this.props;
		saveProject(this.state);
	};

	render() {
		const { openDropdown, open } = this.props;
		const chart = this.state;
		const stateActions = mapValues(actions, func => (...args) => {
			this.setState(func(...args));
		});
		return (
			<React.Fragment>
				<Button label={'save'} onClick={this.onClickSave} />
				<Page>
					<Sidebar>
						<SidebarClassifier sidebarItemList={sidebarItemList} />
					</Sidebar>
					<Content>
						<FlowChart
							chart={chart}
							callbacks={stateActions}
							Components={{
								NodeInner: NodeInnerCustom,
							}}
						/>
					</Content>
					<BoxInfo chart={chart} />
				</Page>
			</React.Fragment>
		);
	}
}
