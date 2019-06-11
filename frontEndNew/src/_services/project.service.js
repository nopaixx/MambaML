import { authHeader } from '../_helpers';
import {
	SAVE_PROJECT_URL,
	CREATE_PROJECT_URL,
	GET_ACTORS_URL,
	GET_PROJECT_URL,
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

function get(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(`${GET_PROJECT_URL}?id=${id}`, requestOptions).then(response =>
		handleResponse(response)
	);
}

function save(project) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(project),
	};

	return fetch(`${SAVE_PROJECT_URL}`, requestOptions).then(handleResponse);
}

function getAllActors() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(
		`${GET_ACTORS_URL}?frontendVersion=V1&backendVersion=V1`,
		requestOptions
	).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
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
