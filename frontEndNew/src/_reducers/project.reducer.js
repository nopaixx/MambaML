import { projectConstants } from '../_constants';
import { CardActions } from '@material-ui/core';

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
			console.log('reducer, action', action);
			return {
				...state,
				chartStructure: action.chartStructure,
			};
		case projectConstants.RUN_PROJECT_REQUEST:
			return {
				...state,
				projectStatus: action.projectStatus,
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
