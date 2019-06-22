import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { Input, Button } from '../../_components/Utils/';
import { adminActions } from '../../_actions';
import TextField from '@material-ui/core/TextField';

import './AdminPage.css';

import 'brace/mode/python';
import 'brace/theme/monokai';

import MaterialTableDemo from '../../_components/Utils/Table/Table2';

const TextEditors = ({
	dependencies,
	code,
	onChangeCodeScript,
	onChangeDependencies,
	onCickDisplayEditor,
	activeCodeEditor,
}) => {
	return (
		<div className={'code-editors-admin'}>
			<div className="col-md-6 editor-column">
				<h3 id={'Dependencies'} onClick={onCickDisplayEditor}>
					Dependencies
				</h3>
				{activeCodeEditor['Dependencies'] ? (
					<AceEditor
						mode="python"
						theme="monokai"
						width={'350px'}
						height={'200px'}
						value={dependencies}
						onChange={onChangeDependencies}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
			<div className="col-md-6 editor-column">
				<h3 id={'PythonScript'} onClick={onCickDisplayEditor}>
					Python Script
				</h3>
				{activeCodeEditor['PythonScript'] ? (
					<AceEditor
						mode="python"
						theme="monokai"
						width={'650px'}
						height={'300px'}
						value={code}
						onChange={onChangeCodeScript}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
		</div>
	);
};

class AdminPage extends React.Component {
	state = {
		code: '',
		dependencies: '',
		activeCodeEditor: { Dependencies: false, PythonScript: false },
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
			depen_code: dependencies,
			python_code: code,
		};
		dispatch(adminActions.createBox(box));
	};

	onCickDisplayEditor = e => {
		const { id } = e.target;
		this.setState(prevstate => {
			return {
				activeCodeEditor: {
					[id]: !prevstate.activeCodeEditor[id],
				},
			};
		});
	};

	render() {
		const { code, dependencies, activeCodeEditor } = this.state;
		return (
			<React.Fragment>
				<div>
					<h1>You are in the Admin Page</h1>
					<h3>Create Box:</h3>
					<Button label={'Create Box'} />
					<div className={'complete-fields-box'}>
						<form
							name="form"
							onSubmit={this.handleSubmit}
							className={'box-info-form'}>
							<TextField
								id="outputPorts"
								label="boxClass"
								className={''}
								name={'boxClass'}
								defaultValue={'Python Module'}
								onChange={this.handleChange}
								margin="normal"
							/>
							<TextField
								id="type"
								label="Type"
								className={''}
								name={'type'}
								onChange={this.handleChange}
								margin="normal"
							/>
							<TextField
								id="input"
								label="Input"
								type="number"
								className={''}
								name={'input'}
								onChange={this.handleChange}
								margin="normal"
							/>
							<TextField
								id="outputPorts"
								label="Output"
								type="number"
								className={''}
								name={'outputPorts'}
								onChange={this.handleChange}
								margin="normal"
							/>
							<Button onClick={this.CreateBox} label={'Create Box'} />
						</form>
						<div className={'table-wrapper'}>
							<MaterialTableDemo />
						</div>
					</div>
				</div>
				<TextEditors
					dependencies={dependencies}
					code={code}
					onChangeCodeScript={this.onChangeCodeScript}
					onChangeDependencies={this.onChangeDependencies}
					onCickDisplayEditor={this.onCickDisplayEditor}
					activeCodeEditor={activeCodeEditor}
				/>
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
