import { projectConstants } from '../_constants';

export function project(state = {}, action) {
	switch (action.type) {
		case projectConstants.GET_PROJECT_REQUEST:
			console.log('action', action);
			return {
				...state,
				gettingProject: true,
			};
		case projectConstants.GET_PROJECT_SUCCESS:
			console.log('action', action);
			return {
				...state,
				project: action,
				gettingProject: false,
			};

		default:
			return state;
	}
}
