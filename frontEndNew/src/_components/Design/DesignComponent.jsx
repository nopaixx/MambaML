import React, { useState, useEffect } from 'react';

import { DragDropState } from './Canvas/DragDropState';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';

import { ProjectToolbar } from '../Utils/Toolbar/Toolbar';
import './DesignComponent.css';

import { DataVisualization } from './DataVisualization/DataVisualization';

const DesignComponent = props => {
	const [projectName, setProjectName] = useState('');
	const [projectID, setProjectID] = useState();

	useEffect(() => {
		const { dispatch, match } = props;
		dispatch(projectActions.getAllActors());
		const ID = match.params.id;
		setProjectID(ID);
		dispatch(projectActions.get(ID));
		dispatch(projectActions.checkFirstLoadProjectStatus(ID));
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

	const handleCloseSerializeModal = () => {
		const { dispatch } = props;
		dispatch(projectActions.serializeProjectModal(false));
	};

	const handleChangeName = e => {
		setProjectName(e.target.value);
	};

	const runFullProject = () => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		onSaveProject();
		dispatch(projectActions.run(projectId));
	};
	const runExportProject = () => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.exportProject(projectId));
	};
	const runImportProject = () => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.importProject(projectId));
	};
	const runBox = boxId => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.runBox(projectId, boxId));
	};

	const handleCloseTable = () => {
		const { dispatch } = props;
		dispatch(projectActions.loadPortPreview(undefined));
	};

	const {
		actorsTree,
		project,
		projectStatus,
		chartStructure,
		savedProject,
		boxesStatus,
		portDataPreview,
		openSerializeModal,
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
				{portDataPreview ? (
					<div
						style={{
							width: '100vw',
							height: '100vh',
							backgroundColor: '#ffffffe0',
							zIndex: 8888,
							position: 'absolute',
							top: 0,
							left: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<div
							style={{
								width: '96vw',
								height: '96vh',
								backgroundColor: 'white',
								zIndex: 9999,
								border: '1px solid black',
								overflow: 'scroll',
								textAlign: 'center',
							}}>
							<DataVisualization
								portDataPreview={portDataPreview}
								handleCloseTable={handleCloseTable}
							/>
						</div>
					</div>
				) : null}
				{openSerializeModal ? (
					<div
						style={{
							width: '100vw',
							height: '100vh',
							backgroundColor: '#ffffff4d',
							zIndex: 8888,
							position: 'absolute',
							top: 0,
							left: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<div
							style={{
								width: '16vw',
								height: '16vh',
								backgroundColor: 'white',
								zIndex: 9999,
								borderRadius: 10,
								overflow: 'scroll',
								textAlign: 'center',
							}}>
							<div>Heeeeey</div>
							<div onClick={handleCloseSerializeModal}>Cancel</div>
						</div>
					</div>
				) : null}
				<ProjectToolbar
					projectName={projectName}
					onSaveProject={onSaveProject}
					handleChangeName={handleChangeName}
					runFullProject={runFullProject}
					projectStatus={projectStatus}
					savedProject={savedProject}
					runExportProject={runExportProject}
					runImportProject={runImportProject}
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
		portDataPreview,
		openSerializeModal,
	} = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
		actorsTree,
		chartStructure,
		projectStatus,
		savedProject,
		portDataPreview,
		boxesStatus,
		openSerializeModal,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };
