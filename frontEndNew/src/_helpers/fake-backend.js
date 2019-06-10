// array in local storage for registered users
import axios from 'axios';
import Querystring from 'query-string';
import { TOKEN_URL } from '../endpoint.js';

// let users = JSON.parse(localStorage.getItem('users')) || [];

export function configureFakeBackend() {
	// let realFetch = window.fetch;
	window.fetch = function(url, opts) {
		return new Promise((resolve, reject) => {
			// wrap in timeout to simulate server api call
			// authenticate
			if (opts.method === 'POST') {
				let params = JSON.parse(opts.body);
				if (url === TOKEN_URL) {
					axios
						.post(url, Querystring.stringify(params))
						.then(response => {
							resolve({
								ok: true,
								text: () => Promise.resolve(JSON.stringify(response)),
							});
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					axios
						.post(url, Querystring.stringify(params), { headers: opts.headers })
						.then(response => {
							resolve({
								ok: true,
								text: () => Promise.resolve(JSON.stringify(response)),
							});
						})
						.catch(error => {
							console.log(error);
						});
				}
			} else if (opts.method === 'GET') {
				console.log(opts);
				//let params = JSON.parse(opts.body);
				axios
					.get(url, {
						headers: opts.headers,
					})
					.then(response => {
						resolve({
							ok: true,
							text: () => Promise.resolve(JSON.stringify(response)),
						});
					})
					.catch(error => {
						console.log('ERRRRRROR');
						console.log(error);
					});
			}
		});
	};
}
