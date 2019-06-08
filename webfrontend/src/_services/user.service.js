import config from 'config';
import { authHeader } from '../_helpers';
import { TOKEN_URL, MYUSER_URL, GET_ACTORS_URL } from '../endpoint.js';
import { CLIENT_ID } from '../global_constants.js';
export const userService = {
	login,
	logout,
	// register,
	// getAll,
	// getById,
	// update,
	// delete: _delete,
};

function login(username, password) {
	const grant_type = 'password';
	const client_id = CLIENT_ID;

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },

		body: JSON.stringify({ username, password, grant_type, client_id }),
	};

	return fetch(`${TOKEN_URL}`, requestOptions)
		.then(handleResponse)
		.then(response => {
			console.log(response);
			// set header for all next peticions
			localStorage.setItem('token', response.data.access_token);
			localStorage.setItem('refresh_token', response.data.refresh_token);
			const requestOptions = {
				method: 'GET',
				headers: authHeader(),
			};
			console.log(GET_ACTORS_URL, requestOptions);

			fetch(
				`${GET_ACTORS_URL}?frontendVersion=V1&backendVersion=V1`,
				requestOptions
			)
				.then(handleResponse)
				.then(res => console.log('AAAAAAAAAAAAAAAAA', JSON.parse(res.data[0])));
			//if get token success then try to get our data with myuser endpoint
			fetch(`${MYUSER_URL}`, requestOptions)
				.then(handleResponse)
				.then(user => {
					localStorage.setItem('user', user.data);
					console.log(user.data);
					console.log('ENDMY USER');
					///aqui cogemos el my user con el header!
					return user.data;
				});
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

// function getAll() {
// 	const requestOptions = {
// 		method: 'GET',
// 		headers: authHeader(),
// 	};

// 	return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
// 	const requestOptions = {
// 		method: 'GET',
// 		headers: authHeader(),
// 	};

// 	return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
// 		handleResponse
// 	);
// }

// function register(user) {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(user),
// 	};

// 	return fetch(`${config.apiUrl}/users/register`, requestOptions).then(
// 		handleResponse
// 	);
// }

// function update(user) {
// 	const requestOptions = {
// 		method: 'PUT',
// 		headers: { ...authHeader(), 'Content-Type': 'application/json' },
// 		body: JSON.stringify(user),
// 	};

// 	return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
// 		handleResponse
// 	);
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
// 	const requestOptions = {
// 		method: 'DELETE',
// 		headers: authHeader(),
// 	};

// 	return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
// 		handleResponse
// 	);
// }

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
