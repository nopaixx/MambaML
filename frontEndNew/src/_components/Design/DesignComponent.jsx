import React from 'react';

import MambaLogo from '../../logo_peque.png';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import { chartSimple } from './chartSimple';
import { DragAndDropSidebar } from './DragAndDrop';
import { ExternalReactState } from './ExternalReactState';
import { InternalReactState } from './InternalReactState';
import { CustomNodeInnerDemo } from './NodeCustom';
import { DragDropState } from './DragDropState';
import './DesignComponent.css';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';

class DesignComponent extends React.Component {
	componentDidMount() {
		const { dispatch, project, match } = this.props;
		if (!project) {
			console.log('params', match);
			const ID = match.params.id;
			//dispatch(projectActions.get(+ID));
		}
	}

	onClickLogo = () => {
		const { history } = this.props;
		history.push(`/`);
	};

	onSaveProject = chart => {
		const { dispatch, project } = this.props;
		dispatch(projectActions.save(project.id, project.name, chart, 'V1', 'V1'));
	};

	render() {
		return (
			<React.Fragment>
				<div className={'design-window'}>
					{/* <DragAndDropSidebar /> */}
					{/* <ExternalReactState /> */}
					{/* <InternalReactState /> */}
					<DragDropState saveProject={this.onSaveProject} />
					{/* <CustomNodeInnerDemo /> */}
					{/* <FlowChartWithState initialValue={chartSimple} /> */}
				</div>
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
