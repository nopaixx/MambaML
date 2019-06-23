import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, projectActions } from '../../_actions';
import { Button } from '../../_components/Utils/Button/Button';
import styled from 'styled-components';
import { ProjectCard } from '../../_components/Utils/Card/Card';

const ProjectBox = styled.div`
	border: 1px solid #b43539;
	border-radius: 5px;
	width: 500px;
	display: flex;
	justify-content: space-between;
	padding: 10px;
	margin-bottom: 10px;
	:hover {
		background-color: #d38c8c;
	}
`;

const ProjectsList = ({ projects, handleLoadProject }) => {
	if (!projects) {
		return null;
	}
	return projects.map((project, key) => {
		return (
			<React.Fragment>
				<ProjectCard />
				<ProjectBox key={key}>
					{project.name}
					<Link to={`/project/${project.id}`}>Load Project</Link>
				</ProjectBox>
			</React.Fragment>
		);
	});
};

class HomePage extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(projectActions.getAllProjects());
	}

	handleDeleteUser(id) {
		//return e => this.props.dispatch(userActions.delete(id));
	}

	handleCreateProject = () => {
		const { dispatch } = this.props;
		dispatch(
			projectActions.create(`Project ${Math.random()}`, '{}', 'V1', 'V1')
		);
	};
	handleLoadProject = () => {};

	render() {
		const { user, projects } = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi {user.username}!</h1>
				<p>You're logged into MambaML!!</p>
				<h3>Projects:</h3>
				<ProjectsList
					handleLoadProject={this.handleLoadProject}
					projects={projects}
				/>
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
	const { projects } = state.project;
	const { user } = authentication;
	return {
		user,
		users,
		projects,
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
