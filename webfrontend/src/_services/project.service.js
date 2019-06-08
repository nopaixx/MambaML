//import config from 'config';
import { authHeader } from '../_helpers';
import { SAVE_PROJECT_URL, CREATE_PROJECT_URL } from '../endpoint.js';
export const projectService = {
	save,
	//get,
	create,
};

function save(project) {
	console.log('project.service SAVE', project);
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(project),
	};

	console.log('requestOptions', requestOptions);

	return fetch(`${SAVE_PROJECT_URL}`, requestOptions).then(handleResponse);
}
// function get(project) {
// 	console.log('project', project);
// 	const requestOptions = {
// 		method: 'GET',
// 		headers: { ...authHeader(), 'Content-Type': 'application/json' },
// 		body: JSON.stringify(project),
// 	};

// 	console.log('requestOptions', requestOptions);

// 	return fetch(`${SAVE_PROJECT_URL}`, requestOptions).then(response =>
// 		handleResponse(response)
// 	);
// }

function create(project) {
	console.log('project.service CREATE', project);
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(project),
	};

	console.log('requestOptions', requestOptions);

	return fetch(`${CREATE_PROJECT_URL}`, requestOptions).then(response =>
		handleResponse(response)
	);
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
