import { adminConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from './';

export const adminActions = {
	createBox,
	updateBox,
	restartBoxFactory,
};

function createBox(box) {
	return dispatch => {
		dispatch(request(box));

		adminService.createBox(box).then(
			box => {
				dispatch(success(box));
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
