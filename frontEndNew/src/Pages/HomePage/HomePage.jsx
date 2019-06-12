import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, projectActions } from '../../_actions';
import { Button } from '../../_components/Utils/Button/Button';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(projectActions.getAllProjects());
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
		const { user } = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi {user.username}!</h1>
				<p>You're logged into MambaML!!</p>
				<h3>Actions:</h3>
				<Button onClick={this.handleLoadProject} label={'Load Project'} />
				<Button onClick={this.handleCreateProject} label={'Create Project'} />
				<p className={'mt-3'}>
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
