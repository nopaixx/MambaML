import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { Input } from '../../_components/Utils/';
import { Button } from '../../_components/Utils/';
import { adminActions } from '../../_actions';
import 'brace/mode/python';
import 'brace/theme/monokai';

class AdminPage extends React.Component {
	state = {
		code: '',
	};

	onChangeCodeScript = newValue => {
		console.log('code', newValue);
		this.setState({ code: newValue });
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { type, inputPorts, outputPorts, code } = this.state;
		const box = {
			type,
			inputPorts,
			outputPorts,
			code,
		};
		adminActions.createBox(box);
		console.log(box);
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
				<div className="col-md-6">
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
