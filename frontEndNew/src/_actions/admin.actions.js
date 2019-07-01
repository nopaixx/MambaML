import { adminConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from './';

export const adminActions = {
	createBox,
	updateBox,
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
		return { type: adminConstants.SAVE_BOX_REQUEST, box };
	}
	function success(box) {
		return { type: adminConstants.SAVE_BOX_SUCCESS, box };
	}
	function failure(error) {
		return { type: adminConstants.SAVE_BOX_FAILURE, error };
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
