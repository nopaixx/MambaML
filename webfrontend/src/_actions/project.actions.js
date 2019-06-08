import { projectConstants } from '../_constants';
import { projectService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const projectActions = {
	save,
	create,
	load,
	get,
};

function save(
	projectId,
	projectName,
	chartStructure,
	frontVersion,
	backVersion
) {
	return dispatch => {
		const project = {
			projectId,
			projectName,
			chartStructure,
			frontVersion,
			backVersion,
		};
		dispatch(request(project));

		projectService.save(project).then(
			project => {
				console.log('project', project);
				dispatch(success(project));
				history.push('/');
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return { type: projectConstants.SAVE_PROJECT_REQUEST, project };
	}
	function success(project) {
		return { type: projectConstants.SAVE_PROJECT_SUCCESS, project };
	}
}

function create(projectName, frontVersion, backVersion) {
	return dispatch => {
		const project = {
			projectName,
			frontVersion,
			backVersion,
		};
		dispatch(request(project));

		projectService.create(project).then(
			project => {
				dispatch(success(project));
				history.push(`/project`);
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return { type: projectConstants.CREATE_PROJECT_REQUEST, project };
	}
	function success(project) {
		return { type: projectConstants.CREATE_PROJECT_SUCCESS, project };
	}
}
function load(projectId) {
	return dispatch => {
		const project = {
			projectId,
		};
		dispatch(request(project));

		projectService.create(project).then(
			project => {
				dispatch(success(project));
				history.push(`/project/${project.id}`);
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return { type: projectConstants.LOAD_PROJECT_REQUEST, project };
	}
	function success(project) {
		return { type: projectConstants.LOAD_PROJECT_SUCCESS, project };
	}
}

function get(projectId) {
	return dispatch => {
		const project = {
			projectId,
		};
		dispatch(request(project));

		projectService.create(project).then(
			project => {
				project = {
					id: '2',
					projectName: 'prueba1',
					chartStructure: '112',
					frontVersion: 'V1',
					backVersion: 'V1',
				};
				dispatch(success(project));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return { type: projectConstants.GET_PROJECT_REQUEST, payload: project };
	}
	function success(project) {
		return { type: projectConstants.GET_PROJECT_SUCCESS, payload: project };
	}
}
