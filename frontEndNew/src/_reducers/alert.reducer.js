import { notificationsConstants } from '../_constants';

export function alert(state = {}, action) {
	switch (action.type) {
		case notificationsConstants.SUCCESS:
			return {
				type: 'success',
				message: action.message,
			};
		case notificationsConstants.ERROR:
			return {
				type: 'error',
				message: action.message,
			};
		case notificationsConstants.WARNING:
			return {
				type: 'warning',
				message: action.message,
			};
		case notificationsConstants.INFO:
			return {
				type: 'info',
				message: action.message,
			};
		case notificationsConstants.CLEAR:
			return {};
		default:
			return state;
	}
}
