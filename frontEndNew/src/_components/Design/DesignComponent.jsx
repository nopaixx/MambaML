import React, { useState, useEffect } from 'react';

import { DragDropState } from './DragDropState';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';

import Button from '@material-ui/core/Button';

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

	const handleChangeName = e => {
		setProjectName(e.target.value);
	};

	const runFullProject = () => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.run(projectId));
	};
	const runExportProject = () => {
		const { dispatch, match } = props
		const projectId = match.params.id
		dispatch(projectActions.exportProject(projectId));
	}
	const runBox = boxId => {
		const { dispatch, match } = props;
		const projectId = match.params.id;
		dispatch(projectActions.runBox(projectId, boxId));
	};

	const handleCloseTable = () => {
		const { dispatch } = props;
		dispatch(projectActions.loadPortPreview(undefined));
	};

	const renderTableHeader = () => {
		const { columns } = props.portDataPreview.out0;
		let header = Object.values(JSON.parse(columns)[0]);
		return header.map((key, index) => {
			return (
				<div key={index} style={{ width: 150, border: '1px solid black' }}>
					{key.toUpperCase()}
				</div>
			);
		});
	};

	const renderTableData = () => {
		const { first100 } = props.portDataPreview.out0;
		const { columns } = props.portDataPreview.out0;
		const parsedColumns = JSON.parse(columns)[0];
		const parsedFirst100 = JSON.parse(first100);
		const headers = Object.values(parsedColumns);
		return headers.map((head, index) => {
			return (
				<div key={index} style={{ width: 150, borderRight: '1px solid black' }}>
					{Object.values(parsedFirst100[head]).map((item, index) => {
						return (
							<div
								key={index}
								style={{
									height: 50,
									borderBottom: '1px solid black',
									overflow: 'scroll',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								{item}
							</div>
						);
					})}
				</div>
			);
		});
	};

	const {
		actorsTree,
		project,
		projectStatus,
		chartStructure,
		savedProject,
		boxesStatus,
		portDataPreview,
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
							backgroundColor: 'transparent',
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
								width: '90vw',
								height: '90vh',
								backgroundColor: 'white',
								zIndex: 9999,
								border: '1px solid black',
								overflow: 'scroll',
								textAlign: 'center',
							}}>
							<Button
								onClick={handleCloseTable}
								variant='outlined'
								color='primary'>
								Close Table
							</Button>
							<div>
								<div style={{ display: 'inline-flex' }}>
									{renderTableHeader()}
								</div>
								<div style={{ display: 'inline-flex' }}>
									{renderTableData()}
								</div>
							</div>
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
		portDataPreview,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };
