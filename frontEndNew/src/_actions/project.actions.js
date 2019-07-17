import { projectConstants } from '../_constants';
import { projectService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { saveJSON, buildFileSelector } from './utils.global.js';

export const projectActions = {
	save,
	unsavedProject,
	create,
	load,
	get,
	getAllActors,
	getAllProjects,
	updateChartStructure,
	run,
	runBox,
	checkFirstLoadProjectStatus,
	loadPortPreview,
	exportProject,
	importProject,
};

function create(
	projectName,
	json,
	userId,
	frontendVersion,
	backendVersion,
	machine_id = 1
) {
	return dispatch => {
		const project = {
			name: projectName,
			json,
			//user_id: userId,
			frontendVersion,
			backendVersion,
			//machine_ami_id: machine_id,
		};
		dispatch(request(project));

		projectService.create(project).then(
			project => {
				const ID = project.data.id;
				project.data['projectName'] = project.data.name;
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
					id: project.data.id,
					projectName: project.data.name,
					chartStructure: JSON.parse(project.data.json),
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

	function request() {
		return {
			type: projectConstants.GET_ALL_PROJECT_REQUEST,
		};
	}
	function success(projects) {
		return {
			type: projectConstants.GET_ALL_PROJECT_SUCCESS,
			payload: projects.data,
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
function loadPortPreview(port) {
	return dispatch => dispatch(success(port));
	function success(port) {
		return { type: projectConstants.LOAD_PORT_PREVIEW, port };
	}
}
const checkProjectStatus = projectId => {
	return dispatch => {
		projectService.checkRunStatus(projectId).then(
			projectData => {
				const projectStatus = JSON.parse(projectData.data.status);
				console.log('projectStatus in actions', projectStatus);
				if (projectStatus.project_stat === 'PENDING') {
					dispatch(updateBoxesStatus(projectStatus));
					setTimeout(() => dispatch(checkProjectStatus(projectId)), 1000);
				} else if (projectStatus.project_stat === 'OK') {
					dispatch(updateBoxesStatus(projectStatus));
					dispatch(success(projectStatus));
					dispatch(get(projectId));
				} else if (projectStatus.project_stat === 'ERROR') {
					dispatch(updateBoxesStatus(projectStatus));
					dispatch(success(projectStatus));
					dispatch(get(projectId));
				} else {
					dispatch(success(projectStatus));
				}
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function success(projectStatus) {
		return { type: projectConstants.CHECK_PROJECT_SUCCESS, projectStatus };
	}
	function failure(error) {
		return { type: projectConstants.CHECK_PROJECT_FAILURE, error };
	}
};

function updateBoxesStatus(boxesStatus) {
	return { type: projectConstants.UPDATE_BOXES_STATUS_SUCCESS, boxesStatus };
}

function exportProject(projectId) {
	return dispatch => {
		projectService.get(projectId).then(
			project => {
				saveJSON(project.data.json, 'project.json');
			},
			error => {
				dispatch(alertActions.error(error.toString()));
			}
		);
	};
}
function importProject(projectId) {
	return dispatch => {
		const id = 'importProjectSelector';
		const selector = buildFileSelector(id);
		selector.click();
		selector.addEventListener('change', () => uploadFile(selector.files));

		const uploadFile = files => {
			var fr = new FileReader();
			fr.onload = function(e) {
				var result = JSON.parse(e.target.result);
				console.log(result)
				//var chartStructure = JSON.stringify(result.data.json, null, 2);
				var chartStructure = result;
				const projectToSave = {
					id: projectId,
					name: 'dfdf',
					json: chartStructure,
					frontendVersion: 'V1',
					backendVersion: 'V1',
				};
				const projectToRender = {
					id: projectId,
					name: 'dfdf',
					chartStructure: chartStructure,
					frontendVersion: 'V1',
					backendVersion: 'V1',
				};
				projectService.save(projectToSave);
				dispatch(success(projectToRender));
			};
			fr.readAsText(files.item(0));
		};
	};
	function success(project) {
		return { type: projectConstants.GET_PROJECT_SUCCESS, payload: project };
	}
}

function run(projectId) {
	return dispatch => {
		dispatch(request('running'));
		let counter = 0;
		projectService.run(projectId).then(
			project => {
				dispatch(checkProjectStatus(projectId, counter));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(projectStatus) {
		return { type: projectConstants.RUN_PROJECT_REQUEST, projectStatus };
	}
	function failure(error) {
		return { type: projectConstants.RUN_PROJECT_FAILURE, error };
	}
}
function checkFirstLoadProjectStatus(projectId) {
	return dispatch => {
		let counter = 0;

		dispatch(checkProjectStatus(projectId, counter));
	};
}

function runBox(projectId, boxId) {
	return dispatch => {
		dispatch(request(projectId, boxId));

		projectService.runBox(projectId, boxId).then(
			project => {
				dispatch(success(project));
				dispatch(checkProjectStatus(projectId, 0));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(project) {
		return { type: projectConstants.RUN_NODE_REQUEST, project };
	}
	function success(project) {
		return { type: projectConstants.RUN_NODE_SUCCESS, project };
	}
	function failure(error) {
		return { type: projectConstants.RUN_NODE_FAILURE, error };
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
function unsavedProject() {
	return dispatch => {
		dispatch(success());
	};
	function success() {
		return { type: projectConstants.UNSAVED_PROJECT_SUCCESS };
	}
}

function getAllActors() {
	return dispatch => {
		dispatch(request());
		projectService.getAllActors().then(
			actors => {
				const constructedActors = [];
				const actorsList = [];
				actors.data.forEach(actor => {
					const newActor = boxFactory(JSON.parse(actor));
					const actorItem = JSON.parse(actor);
					constructedActors.push(newActor);
					actorsList.push(actorItem);
				});
				const tree = treeConstructor(constructedActors);
				dispatch(success(tree, actorsList));
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
	function success(actorsTree, actorsList) {
		return {
			type: projectConstants.GET_ALL_ACTORS_SUCCESS,
			actorsTree: actorsTree,
			actorsList: actorsList,
		};
	}
	function failure(error) {
		return { type: projectConstants.GET_ALL_ACTORS_FAILURE, error };
	}
}
function updateChartStructure(chartStructure) {
	return dispatch => {
		dispatch(update(chartStructure));
	};

	function update() {
		return { type: projectConstants.CHART_PROJECT_UPDATE, chartStructure };
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
	parameters,
	friendly_name,
}) => {
	const ports = {};
	const hasChange = false;
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
		name: friendly_name,
		ports,
		properties: {
			payload: {
				python_code: python_code,
				depen_code: depen_code,
				n_input_ports,
				n_output_ports,
				frontendVersion,
				backendVersion,
				parameters,
				name: friendly_name,
				hasChange,
			},
		},
	};
	return boxStructure;
};

const treeConstructor = data => {
	const firstIndex = data.length;
	let tree = {};
	let treeArray = [];
	let head = [];
	for (let i = 0; i < firstIndex; ++i) {
		const actualData = data[i];
		let soloTree = treeBranchConstructor(actualData, tree, head);
		treeArray.push(soloTree);
	}
	let finalTree = {};
	treeArray.forEach(tree => {
		const treeKey = Object.keys(tree);
		if (!head.includes(treeKey[0])) {
			head.push(treeKey[0]);
		}
	});
	head.forEach(treehead => {
		const treesToMerge = treeArray.filter(
			tree => Object.keys(tree)[0] === treehead
		);
		if (treesToMerge.length > 1) {
			let tree2;
			for (let i = 0; i < treesToMerge.length; i++) {
				if (treesToMerge[i] && treesToMerge[i + 1]) {
					tree2 = supermerge(treesToMerge[i], treesToMerge[i + 1]);
				}
			}
			finalTree = { ...finalTree, ...tree2 };
		} else {
			finalTree = { ...finalTree, ...treesToMerge[0] };
		}
	});
	return finalTree;
};

const treeBranchConstructor = (branch, tree, head) => {
	const levels = branch.name.split('-');
	let finishedTree;

	const size = levels.length;
	let counter = 0;
	build(counter, size, levels, branch, tree);
	finishedTree = levels[0];

	return finishedTree;
};

const build = (counter, size, levels, branch, tree) => {
	counter++;
	let prevCounter = counter - 1;
	if (counter === 1) {
		levels[size - counter] = {
			[levels[size - counter]]: {
				label: levels[size - counter],
				payload: branch,
			},
		};
		build(counter, size, levels, branch, tree);
	} else if (counter <= size) {
		levels[size - counter] = {
			[levels[size - counter]]: {
				label: levels[size - counter],
				nodes: levels[size - prevCounter],
			},
		};

		build(counter, size, levels, branch, tree);
	}
};

const supermerge = (target, source) => {
	for (let key of Object.keys(source)) {
		if (source[key] instanceof Object) {
			if (!target[key]) {
				target = {
					...target,
					...source,
				};
			} else {
				Object.assign(source[key], supermerge(target[key], source[key]));
			}
		}
	}
	Object.assign(target || {}, source);

	return target;
};
