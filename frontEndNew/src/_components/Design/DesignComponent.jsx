import React, { useState, useEffect } from 'react';

import { DragDropState } from './DragDropState';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';

import { ProjectToolbar } from '../Utils/Toolbar/Toolbar';
import { Button } from '../Utils/Button/Button';
import { Input } from '../Utils/Input/Input';
import './DesignComponent.css';

const DesignComponent = props => {
	const [projectName, setProjectName] = useState('');

	useEffect(() => {
		const { dispatch, project, match } = props;
		dispatch(projectActions.getAllActors());
		if (!project) {
			const ID = match.params.id;
			dispatch(projectActions.get(ID));
		}
	}, []);

	useEffect(() => {
		const { project } = props;
		if (!projectName && project) {
			setProjectName(project.projectName);
		}
	}, [props, projectName]);

	const onSaveProject = () => {
		const { dispatch, project, match, chartStructure } = props;
		const ID = match.params.id;
		dispatch(
			projectActions.save(
				ID,
				projectName || 'casae',
				chartStructure,
				'V1',
				'V1'
			)
		);
	};

	const handleChangeName = e => {
		setProjectName(e.target.value);
	};

	const { actors, project } = props;

	if (!project) {
		return null;
	}
	if (project) {
		return (
			<React.Fragment>
				<div className={'design-window'}>
					<DragDropState
						actors={actors}
						updateBoxInfo={onSaveProject}
						project={project}
						dispatch={props.dispatch}
					/>
				</div>
				<ProjectToolbar
					projectName={projectName}
					onSaveProject={onSaveProject}
					handleChangeName={handleChangeName}
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
		actors,
		creatingProject,
		chartStructure,
	} = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
		actors,
		chartStructure,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };
