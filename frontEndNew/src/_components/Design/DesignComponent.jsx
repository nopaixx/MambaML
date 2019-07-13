import React, { useState, useEffect } from 'react';

import { DragDropState } from './DragDropState';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';

import { ProjectToolbar } from '../Utils/Toolbar/Toolbar';
import './DesignComponent.css';

const DesignComponent = props => {
	const [projectName, setProjectName] = useState('');
	const [projectID, setProjectID] = useState();

	useEffect(() => {
		const { dispatch, match } = props;
		dispatch(projectActions.getAllActors());
		const ID = match.params.id;
		setProjectID(ID);
		dispatch(projectActions.get(ID));
	}, []);

	useEffect(() => {
		const { project } = props;
		if (!projectName && project) {
			setProjectName(project.projectName);
		}
	}, [props, projectName]);

	const onSaveProject = () => {
		const { dispatch, match, chartStructure } = props;
		const ID = match.params.id;
		if (chartStructure) {
			dispatch(
				projectActions.save(ID, projectName, chartStructure, 'V1', 'V1')
			);
		}
	};

	const handleChangeName = e => {
		setProjectName(e.target.value);
	};

	const runFullProject = () => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.run(projectId));
	};
	const runBox = boxId => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.runBox(projectId, boxId));
	};

	const {
		actorsTree,
		project,
		projectStatus,
		chartStructure,
		savedProject,
		boxesStatus,
	} = props;

	if (!project || (project && project.id != projectID)) {
		return null;
	}
	if (project) {
		return (
			<React.Fragment>
				<div className={'design-window'}>
					<DragDropState
						actors={actorsTree}
						updateBoxInfo={onSaveProject}
						project={project}
						dispatch={props.dispatch}
						runBox={runBox}
						projectStatus={projectStatus}
						chartStructure={chartStructure}
						boxesStatus={boxesStatus}
					/>
				</div>
				<ProjectToolbar
					projectName={projectName}
					onSaveProject={onSaveProject}
					handleChangeName={handleChangeName}
					runFullProject={runFullProject}
					projectStatus={projectStatus}
					savedProject={savedProject}
				/>
			</React.Fragment>
		);
	} else {
		return null;
	}
};

function mapStateToProps(state) {
	const {
		project,
		gettingProject,
		actorsTree,
		creatingProject,
		chartStructure,
		projectStatus,
		savedProject,
		boxesStatus,
	} = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
		actorsTree,
		chartStructure,
		projectStatus,
		savedProject,
		boxesStatus,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };
