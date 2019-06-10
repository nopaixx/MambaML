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
				<button onClick={this.onClickSave}>Save</button>
				<Page>
					<Content>
						<FlowChart
							chart={chart}
							callbacks={stateActions}
							Components={{
								NodeInner: NodeInnerCustom,
							}}
						/>
					</Content>
					<Sidebar>
						{sidebarItemList.map((item, key) => (
							<SidebarItem
								key={key}
								onClick={openDropdown}
								type={item.type}
								ports={item.port}
								properties={item.properties}
							/>
						))}
					</Sidebar>
				</Page>
			</React.Fragment>
		);
	}
}
