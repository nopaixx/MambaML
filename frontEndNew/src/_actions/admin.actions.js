import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const adminActions = {
	createBox,
};

function createBox(box) {
	const newBox = boxFactory(box);
	console.log('newBox', newBox);

	// return dispatch => {

	// 	userService.login(username, password).then(
	// 		user => {
	// 			dispatch(success(user));
	// 			history.push('/');
	// 		},
	// 		error => {
	// 			console.log('dispatch failure');
	// 			dispatch(failure(error.toString()));
	// 			dispatch(alertActions.error(error.toString()));
	// 		}
	// 	);
	// };

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		console.log('user', user);
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

const boxFactory = ({ type, inputPorts, outputPorts, code }) => {
	const ports = {};
	for (let i = 1; i <= inputPorts; ++i) {
		ports[`port${i}`] = {
			id: `port${i}`,
			type: 'input',
			properties: {
				value: 'yes',
			},
		};
	}
	for (
		let j = +inputPorts + 1;
		j <= Number(+outputPorts) + Number(inputPorts);
		++j
	) {
		ports[`port${j}`] = {
			id: `port${j}`,
			type: 'output',
			properties: {
				value: 'yes',
			},
		};
	}
	const boxStructure = {
		type: type,
		ports,
		properties: {
			payload: {
				code: code,
			},
			ninput: inputPorts,
			nouts: outputPorts,
		},
	};
	return boxStructure;
};
