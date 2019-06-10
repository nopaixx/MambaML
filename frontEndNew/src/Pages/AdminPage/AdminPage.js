import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { Input, Button } from '../../_components/Utils/';
import { adminActions } from '../../_actions';

import './AdminPage.css';

import 'brace/mode/python';
import 'brace/theme/monokai';

class AdminPage extends React.Component {
	state = {
		code: '',
		dependencies: '',
	};

	onChangeCodeScript = newValue => {
		this.setState({ code: newValue });
	};
	onChangeDependencies = newValue => {
		this.setState({ dependencies: newValue });
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		const { dispatch } = this.props;
		e.preventDefault();
		const {
			type,
			inputPorts,
			outputPorts,
			code,
			dependencies,
			boxClass,
		} = this.state;
		const box = {
			boxClass: 'Python Module',
			type,
			frontendVersion: 'V1',
			backendVersion: 'V1',
			n_input_ports: inputPorts,
			n_output_ports: outputPorts,
			dependencies_code: dependencies,
			python_code: code,
		};
		dispatch(adminActions.createBox(box));
	};

	render() {
		const { code, dependencies } = this.state;
		return (
			<React.Fragment>
				<div className="col-md-3">
					<h1>You are in the Admin Page</h1>
					<h3>Create Box:</h3>
					<form
						name="form"
						onSubmit={this.handleSubmit}
						className={'text-center'}>
						boxClass:
						<br />
						<Input type="text" name="boxClass" defaultValue={'Python Module'} />
						<br />
						Type:
						<br />
						<Input type="text" name="type" onChange={this.handleChange} />
						<br />
						Input:
						<br />
						<Input
							type="number"
							name="inputPorts"
							onChange={this.handleChange}
						/>
						<br />
						Output:
						<br />
						<Input
							type="number"
							name="outputPorts"
							onChange={this.handleChange}
						/>
						<br />
						<Button onClick={this.CreateBox} label={'Create Box'} />
					</form>
				</div>
				<div className="col-md-6 editor-column">
					<h3>Write Python code for the Box:</h3>
					<AceEditor
						mode="python"
						theme="monokai"
						width={'650px'}
						value={code}
						onChange={this.onChangeCodeScript}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
				</div>
				<div className="col-md-3 editor-column">
					<h3>Write dependencies:</h3>
					<AceEditor
						mode="python"
						theme="monokai"
						width={'350px'}
						height={'200px'}
						value={dependencies}
						onChange={this.onChangeDependencies}
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
