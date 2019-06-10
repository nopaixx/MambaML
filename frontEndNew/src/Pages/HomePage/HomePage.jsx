import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import brace from 'brace';
import { render } from 'react-dom';
import AceEditor from 'react-ace';
import { userActions, projectActions } from '../../_actions';
import { Button } from '../../_components/Utils/Button/Button';
import 'brace/mode/python';
import 'brace/theme/monokai';

function onChangeCodeScript(newValue) {
	console.log('change', newValue);
}

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
		const { user } = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi {user.username}!</h1>
				<p>You're logged into MambaML!!</p>
				<h3>Actions:</h3>
				<Button onClick={this.handleLoadProject} label={'Load Project'} />
				{/* <button onClick={this.handleLoadProject}>Load Project</button> */}
				<Button onClick={this.handleCreateProject} label={'Create Project'} />
				{/* <button onClick={this.handleCreateProject}>Create Project</button> */}
				<p className={'mt-3'}>
					<Link to="/login">Logout</Link>
				</p>
				{/* <AceEditor
					mode="python"
					theme="monokai"
					onChange={onChangeCodeScript}
					name="UNIQUE_ID_OF_DIV"
					editorProps={{ $blockScrolling: true }}
				/> */}
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
