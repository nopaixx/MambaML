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
	updateChartStructure,
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
function getAllActors() {
	return dispatch => {
		dispatch(request());
		projectService.getAllActors().then(
			actors => {
				const constructedActors = [];
				console.log('actors', actors);
				actors.data.forEach(actor => {
					const newActor = boxFactory(JSON.parse(actor));
					constructedActors.push(newActor);
				});
				console.log('constructedActors', constructedActors);
				const tree = treeConstructor(constructedActors);
				dispatch(success(tree));
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
	console.log(
		type,
		n_input_ports,
		n_output_ports,
		python_code,
		depen_code,
		backendVersion,
		frontendVersion,
		parameters,
		friendly_name
	);
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
			},
		},
	};
	return boxStructure;
};

const treeConstructor = data => {
	const firstIndex = actor1.length;
	let tree = {};
	let treeArray = [];
	let head = [];
	for (let i = 0; i < firstIndex; ++i) {
		const actualData = actor1[i];
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

const actor1 = [
	{
		type: 'Python Script',
		name:
			'Tratamiento de Datos-Manipulacion Filas-Split' +
			Math.random() +
			'-Casa' +
			Math.random(),
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port4: {
				id: 'port4',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port5: {
				id: 'port5',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port7: {
				id: 'port7',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port8: {
				id: 'port8',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port9: {
				id: 'port9',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port10: {
				id: 'port10',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				python_code:
					'def %ID(input_1=None, input_2=None, input_3=None, input_4=None, input_5=None):\n    output_1 = None\n    output_2 = None\n    output_3 = None\n    output_4 = None\n    output_5 = None\n    return output_1, output_2, output_3, output_4, output_5\n                ',
				depen_code: '',
				n_input_ports: 5,
				n_output_ports: 5,
				frontendVersion: 'V1',
				backendVersion: 'V1',
				parameters: '{}',
			},
		},
	},
	{
		type: 'Data',
		name:
			'Machine Learning-Manipulacion Filas-Split' +
			Math.random() +
			'-Casa' +
			Math.random(),
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port4: {
				id: 'port4',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port5: {
				id: 'port5',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port7: {
				id: 'port7',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port8: {
				id: 'port8',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port9: {
				id: 'port9',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port10: {
				id: 'port10',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				python_code:
					'def %ID(input_1=None, input_2=None, input_3=None, input_4=None, input_5=None):\n    output_1 = None\n    output_2 = None\n    output_3 = None\n    output_4 = None\n    output_5 = None\n    return output_1, output_2, output_3, output_4, output_5\n                ',
				depen_code: '',
				n_input_ports: 5,
				n_output_ports: 5,
				frontendVersion: 'V1',
				backendVersion: 'V1',
				parameters: '{}',
			},
		},
	},
	{
		type: 'Data',
		name:
			'Machine Learning-Manipulacion Filas-Split' +
			Math.random() +
			'-Casa' +
			Math.random(),
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port4: {
				id: 'port4',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port5: {
				id: 'port5',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port7: {
				id: 'port7',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port8: {
				id: 'port8',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port9: {
				id: 'port9',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port10: {
				id: 'port10',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				python_code:
					'def %ID(input_1=None, input_2=None, input_3=None, input_4=None, input_5=None):\n    output_1 = None\n    output_2 = None\n    output_3 = None\n    output_4 = None\n    output_5 = None\n    return output_1, output_2, output_3, output_4, output_5\n                ',
				depen_code: '',
				n_input_ports: 5,
				n_output_ports: 5,
				frontendVersion: 'V1',
				backendVersion: 'V1',
				parameters: '{}',
			},
		},
	},
	{
		type: 'Data',
		name:
			'Machine Learning-Manipulacion Filas-Split' +
			Math.random() +
			'-Casa' +
			Math.random(),
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port4: {
				id: 'port4',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port5: {
				id: 'port5',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port7: {
				id: 'port7',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port8: {
				id: 'port8',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port9: {
				id: 'port9',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port10: {
				id: 'port10',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				python_code:
					'def %ID(input_1=None, input_2=None, input_3=None, input_4=None, input_5=None):\n    output_1 = None\n    output_2 = None\n    output_3 = None\n    output_4 = None\n    output_5 = None\n    return output_1, output_2, output_3, output_4, output_5\n                ',
				depen_code: '',
				n_input_ports: 5,
				n_output_ports: 5,
				frontendVersion: 'V1',
				backendVersion: 'V1',
				parameters: '{}',
			},
		},
	},
];
