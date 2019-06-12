import { projectConstants } from '../_constants';
import { projectService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const projectActions = {
	save,
	create,
	load,
	get,
	getAllActors,
	getAllProjects,
};

function create(projectName, frontendVersion, backendVersion) {
	return dispatch => {
		const project = {
			name: projectName,
			frontendVersion,
			backendVersion,
		};
		dispatch(request(project));

		projectService.create(project).then(
			project => {
				const ID = project.data.id;
				dispatch(success(project.data));
				history.push(`/project/${ID}`);
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return {
			type: projectConstants.CREATE_PROJECT_REQUEST,
			payload: project,
		};
	}
	function success(project) {
		return {
			type: projectConstants.CREATE_PROJECT_SUCCESS,
			payload: project,
		};
	}
	function failure(error) {
		return { type: projectConstants.LOGIN_FAILURE, error };
	}
}

function get(ID) {
	return dispatch => {
		dispatch(request(ID));
		projectService.get(ID).then(
			project => {
				project = {
					id: '2',
					projectName: 'prueba1',
					chartStructure: '112',
					frontendVersion: 'V1',
					backendVersion: 'V1',
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
	function failure(error) {
		return { type: projectConstants.LOGIN_FAILURE, error };
	}
}

function getAllProjects() {
	return dispatch => {
		dispatch(request());
		projectService.getAll().then(
			projects => {
				dispatch(success(projects));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(projects) {
		return {
			type: projectConstants.GET_ALL_PROJECT_REQUEST,
			payload: projects,
		};
	}
	function success(projects) {
		return {
			type: projectConstants.GET_ALL_PROJECT_SUCCESS,
			payload: projects,
		};
	}
	function failure(error) {
		return { type: projectConstants.GET_ALL_PROJECT_FAILURE, error };
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
	function failure(error) {
		return { type: projectConstants.LOGIN_FAILURE, error };
	}
}

function save(
	projectId,
	projectName,
	chartStructure,
	frontendVersion,
	backendVersion
) {
	return dispatch => {
		console.log(
			'project',
			projectId,
			projectName,
			chartStructure,
			frontendVersion,
			backendVersion
		);
		const project = {
			id: projectId,
			name: projectName,
			json: JSON.stringify(chartStructure),
			frontendVersion: frontendVersion,
			backendVersion: backendVersion,
		};
		dispatch(request(project));
		projectService.save(project).then(
			project => {
				dispatch(success(project));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return { type: projectConstants.SAVE_PROJECT_REQUEST, payload: project };
	}
	function success(project) {
		return { type: projectConstants.SAVE_PROJECT_SUCCESS, payload: project };
	}
	function failure(error) {
		return { type: projectConstants.LOGIN_FAILURE, error };
	}
}
function getAllActors() {
	return dispatch => {
		dispatch(request());
		projectService.getAllActors().then(
			actors => {
				const constructedActors = [];
				actors.data.forEach(actor => {
					const newActor = boxFactory(JSON.parse(actor));
					constructedActors.push(newActor);
				});
				dispatch(success(constructedActors));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request() {
		return { type: projectConstants.GET_ALL_ACTORS_REQUEST };
	}
	function success(actors) {
		return { type: projectConstants.GET_ALL_ACTORS_SUCCESS, payload: actors };
	}
	function failure(error) {
		return { type: projectConstants.GET_ALL_ACTORS_FAILURE, error };
	}
}

const boxFactory = ({
	type,
	n_input_ports,
	n_output_ports,
	python_code,
	depen_code,
	backendVersion,
	frontendVersion,
}) => {
	const ports = {};
	for (let i = 1; i <= n_input_ports; ++i) {
		ports[`port${i}`] = {
			id: `port${i}`,
			type: 'input',
			properties: {
				value: 'yes',
			},
		};
	}
	for (
		let j = +n_input_ports + 1;
		j <= Number(+n_output_ports) + Number(n_input_ports);
		++j
	) {
		ports[`port${j}`] = {
			id: `port${j}`,
			type: 'output',
			properties: {
				value: 'yes',
			},
		};
	}
	const boxStructure = {
		type: type,
		ports,
		properties: {
			payload: {
				python_code: python_code,
				depen_code: depen_code,
				n_input_ports,
				n_output_ports,
				frontendVersion,
				backendVersion,
			},
		},
	};
	return boxStructure;
};
