import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { notifications } from './notifications.reducer';
import { project } from './project.reducer';
import { admin } from './admin.reducer';

const rootReducer = combineReducers({
	authentication,
	registration,
	users,
	notifications,
	project,
	admin,
});

export default rootReducer;
