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
	state = {
		open: undefined,
	};
	componentDidMount() {
		const { dispatch, project, match } = this.props;
		dispatch(projectActions.getAllActors());
		if (!project) {
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
	openDropdown = e => {
		this.setState({ open: e.target.id });
	};

	render() {
		const { open } = this.state;
		return (
			<React.Fragment>
				<div className={'design-window'}>
					{/* <DragAndDropSidebar /> */}
					{/* <ExternalReactState /> */}
					{/* <InternalReactState /> */}
					<DragDropState
						saveProject={this.onSaveProject}
						openDropdown={this.openDropdown}
						open={open}
					/>
					{/* <CustomNodeInnerDemo /> */}
					{/* <FlowChartWithState initialValue={chartSimple} /> */}
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { project, gettingProject, actors, creatingProject } = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
		actors,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };
