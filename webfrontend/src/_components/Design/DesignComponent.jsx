import React from 'react';

import MambaLogo from '../../logo_peque.png';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import { chartSimple } from './chartSimple';
import { DragAndDropSidebar } from './DragAndDrop';
import { ExternalReactState } from './ExternalReactState';
import { InternalReactState } from './InternalReactState';
import { CustomNodeInnerDemo } from './NodeCustom';
import { DragDropState } from './DragDropState';

import { connect } from 'react-redux';
import { projectActions } from '../../_actions';

const ID = 'id';

class DesignComponent extends React.Component {
	componentDidMount() {
		const { dispatch, project, match } = this.props;
		if (!project) {
			console.log('params', match);
			const project = { ID: 1 };
			//dispatch(projectActions.get(project));
		}
	}

	handleSaveProject = chart => {
		const { dispatch, project } = this.props;
		dispatch(projectActions.save(project.id, project.name, chart, 'V1', 'V1'));
	};

	render() {
		return (
			<React.Fragment>
				<img src={MambaLogo} />
				{/* <DragAndDropSidebar /> */}
				{/* <ExternalReactState /> */}
				{/* <InternalReactState /> */}
				<DragDropState saveProject={this.handleSaveProject} />
				{/* <CustomNodeInnerDemo /> */}
				{/* <FlowChartWithState initialValue={chartSimple} /> */}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { project, gettingProject, creatingProject } = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };
