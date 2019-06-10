import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import brace from 'brace';
import { render } from 'react-dom';
import AceEditor from 'react-ace';
import { userActions, projectActions } from '../../_actions';
import { Input } from '../../_components/Utils/';
import { Button } from '../../_components/Utils/';

import 'brace/mode/python';
import 'brace/theme/monokai';

function onChangeCodeScript(newValue) {
	console.log('change', newValue);
}

class AdminPage extends React.Component {
	state = {
		code: '',
	};
	componentDidMount() {
		//this.props.dispatch(userActions.getAll());
	}

	onChangeCodeScript = newValue => {
		console.log('code', newValue);
		this.setState({ code: newValue });
	};

	updateState = code => {
		//this.setState({ code });
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
	};

	render() {
		const { code } = this.state;
		return (
			<React.Fragment>
				<div className="col-md-6">
					<h1>You are in the Admin Page</h1>
					<h3>Create Box:</h3>
					<form
						name="form"
						onSubmit={this.handleSubmit}
						className={'text-center'}>
						Type:
						<br />
						<Input type="text" name="type" onChange={this.handleChange} />
						<br />
						Input:
						<br />
						<Input
							type="number"
							name="input-ports"
							onChange={this.handleChange}
						/>
						<br />
						Output:
						<br />
						<Input
							type="number"
							name="output-ports"
							onChange={this.handleChange}
						/>
						<br />
						<Button onClick={this.CreateBox} label={'Create Box'} />
					</form>
				</div>
				<div className="col-md-6">
					<h3>Write Python code for the Box:</h3>
					<AceEditor
						mode="python"
						theme="monokai"
						width={600}
						value={code}
						onChange={this.onChangeCodeScript}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
			</React.Fragment>
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

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };
