import { authHeader } from '../_helpers';
import {
	SAVE_PROJECT_URL,
	CREATE_PROJECT_URL,
	GET_ACTORS_URL,
} from '../endpoint.js';
export const projectService = {
	save,
	get,
	create,
	getAllActors,
};

function create(project) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(project),
	};

	return fetch(`${CREATE_PROJECT_URL}`, requestOptions).then(response =>
		handleResponse(response)
	);
}

function get(project) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
		body: JSON.stringify(project),
	};

	return fetch(`${SAVE_PROJECT_URL}`, requestOptions).then(response =>
		handleResponse(response)
	);
}

function save(project) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(project),
	};

	return fetch(`${SAVE_PROJECT_URL}`, requestOptions).then(handleResponse);
}
function getAllActors() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(`${GET_ACTORS_URL}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				window.location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}
