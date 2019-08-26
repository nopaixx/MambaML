import { adminConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from './';
import { saveJSON, buildFileSelector } from './utils.global.js';
import { getAllActors } from './project.actions';
export const adminActions = {
	createBox,
	updateBox,
	restartBoxFactory,
	exportBox,
	importBox,
};

function createBox(box) {
	return dispatch => {
		dispatch(request(box));

		adminService.createBox(box).then(
			box => {
				dispatch(success(box));
				dispatch(getAllActors());
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(box) {
		return { type: adminConstants.CREATE_BOX_REQUEST, box };
	}
	function success(box) {
		return { type: adminConstants.CREATE_BOX_SUCCESS, box };
	}
	function failure(error) {
		return { type: adminConstants.CREATE_BOX_FAILURE, error };
	}
}

function restartBoxFactory() {
	return dispatch => {
		dispatch(success());
	};
	function success() {
		return { type: adminConstants.RESTART_BOX_FACTORY_SUCCESS };
	}
}

function updateBox(box) {
	return dispatch => {
		dispatch(request(box));
		adminService.updateBox(box).then(
			box => {
				dispatch(success(box));
				dispatch(getAllActors());
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(box) {
		return { type: adminConstants.UPDATE_BOX_REQUEST, box };
	}
	function success(box) {
		return { type: adminConstants.UPDATE_BOX_SUCCESS, box };
	}
	function failure(error) {
		return { type: adminConstants.UPDATE_BOX_FAILURE, error };
	}
}
function exportBox(Box) {
	saveJSON(JSON.stringify(Box), 'box' + Box.friendly_name + '.json');

	//	return null
}

function importBox() {
	const id = 'importBoxSelector';
	const selector = buildFileSelector(id);
	selector.click();
	selector.addEventListener('change', () => uploadFile(selector.files));
	const uploadFile = files => {
		var fr = new FileReader();
		fr.onload = function(e) {
			var result = JSON.parse(e.target.result);
			//	const box=""
			//var chartStructure = JSON.stringify(result.data.json, null, 2);
			const box = {
				friendly_name: result.friendly_name,
				type: result.type,
				frontendVersion: result.frontendVersion,
				backendVersion: result.backendVersion,
				n_input_ports: result.n_input_ports,
				n_output_ports: result.n_output_ports,
				depen_code: result.depen_code,
				python_code: result.python_code,
				parameters: result.parameters,
			};
			adminService.createBox(box);
		};
		fr.readAsText(files.item(0));
	};
}
