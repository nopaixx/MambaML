import { authHeader } from '../_helpers';
import { CREATE_ACTOR_URL } from '../endpoint.js';
export const adminService = {
	createBox,
};

function createBox(newbox) {
	console.log('newBox', newbox);
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(newbox),
	};

	return fetch(`${CREATE_ACTOR_URL}`, requestOptions).then(response =>
		handleResponse(response)
	);
}

function logout() {
	// remove user from local storage to log user out
	console.log('LOGOUT');
	localStorage.removeItem('user');
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				console.log('error 401');
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
