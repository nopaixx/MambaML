import { adminConstants } from '../_constants';

export function admin(state = {}, action) {
	switch (action.type) {
		case adminConstants.CREATE_BOX_REQUEST:
			return {
				creatingBox: true,
				boxCreated: true,
			};
		case adminConstants.CREATE_BOX_SUCCESS:
			return {
				creatingBox: false,
				boxCreated: true,
			};
		case adminConstants.RESTART_BOX_FACTORY_SUCCESS:
			return {
				creatingBox: false,
				boxCreated: false,
			};

		default:
			return state;
	}
}
