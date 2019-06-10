import { userConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from './';

export const adminActions = {
	createBox,
};

function createBox(box) {
	console.log('box', box);
	return dispatch => {
		//const newBox = boxFactory(box);
		dispatch(request(box));

		adminService.createBox(box).then(
			box => {
				dispatch(success(box));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

const boxFactory = ({
	type,
	inputPorts,
	outputPorts,
	code,
	boxClass,
	backendVersion,
	frontendVersion,
}) => {
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
		boxClass: boxClass,
		ports,
		properties: {
			payload: {
				python_code: code,
			},
			n_input_ports: inputPorts,
			n_output_ports: outputPorts,
			frontendVersion,
			backendVersion,
		},
	};
	return boxStructure;
};
