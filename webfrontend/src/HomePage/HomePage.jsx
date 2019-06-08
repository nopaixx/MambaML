import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, projectActions } from '../_actions';

class HomePage extends React.Component {
	componentDidMount() {
		//this.props.dispatch(userActions.getAll());
	}

	handleDeleteUser(id) {
		//return e => this.props.dispatch(userActions.delete(id));
	}

	handleCreateProject = () => {
		const { dispatch } = this.props;
		dispatch(projectActions.create(`Project ${Math.random()}`, 'V1', 'V1'));
	};
	handleLoadProject = () => {};

	render() {
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi !</h1>
				<p>You're logged into MambaML!!</p>
				<h3>Actions:</h3>
				<button onClick={this.handleLoadProject}>Load Project</button>
				<button onClick={this.handleCreateProject}>Create Project</button>
				<p>
					<Link to="/login">Logout</Link>
				</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users,
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
