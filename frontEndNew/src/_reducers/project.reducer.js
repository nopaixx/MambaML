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
		case projectConstants.SAVE_PROJECT_SUCCESS:
			return {
				...state,
				savedProject: true,
			};
		case projectConstants.UNSAVED_PROJECT_SUCCESS:
			return {
				...state,
				savedProject: false,
			};
		case projectConstants.GET_ALL_PROJECT_SUCCESS:
			return {
				...state,
				projects: action.payload,
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
				actorsTree: action.actorsTree,
				actorsList: action.actorsList,
				gettingActors: false,
			};
		case projectConstants.GET_ALL_ACTORS_REQUEST:
			return {
				...state,
				gettingActors: true,
			};
		case projectConstants.CHART_PROJECT_UPDATE:
			return {
				...state,
				chartStructure: action.chartStructure,
				savedProject: false,
			};
		case projectConstants.RUN_PROJECT_REQUEST:
			return {
				...state,
				projectStatus: action.projectStatus,
			};
		case projectConstants.UPDATE_BOXES_STATUS_SUCCESS:
			return {
				...state,
				boxexStatus: action.boxesStatus,
			};
		case projectConstants.CHECK_PROJECT_SUCCESS:
			return {
				...state,
				projectStatus: action.projectStatus,
			};

		default:
			return state;
	}
}
