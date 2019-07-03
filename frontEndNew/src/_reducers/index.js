import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { project } from './project.reducer';
import { admin } from './admin.reducer';

const rootReducer = combineReducers({
	authentication,
	registration,
	users,
	alert,
	project,
	admin,
});

export default rootReducer;
