import { projectConstants } from '../_constants';

export function project(state = {}, action) {
	switch (action.type) {
		case projectConstants.CREATE_PROJECT_REQUEST:
			return {
				...state,
				creatingProject: true,
			};
		case projectConstants.CREATE_PROJECT_SUCCESS:
			return {
				...state,
				creatingProject: false,
				project: action.payload,
			};
		case projectConstants.GET_PROJECT_REQUEST:
			return {
				...state,
				gettingProject: true,
			};
		case projectConstants.GET_PROJECT_SUCCESS:
			return {
				...state,
				project: action.payload,
				gettingProject: false,
			};
		case projectConstants.GET_ALL_ACTORS_SUCCESS:
			return {
				...state,
				actors: action.payload,
				gettingActors: false,
			};
		case projectConstants.GET_ALL_ACTORS_REQUEST:
			return {
				...state,
				gettingActors: true,
			};

		default:
			return state;
	}
}
