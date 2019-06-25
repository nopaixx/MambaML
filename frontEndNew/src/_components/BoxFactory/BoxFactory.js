import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { Button as ButtonGonzalo } from '../../_components/Utils/';
import { adminActions } from '../../_actions';
import TextField from '@material-ui/core/TextField';
import './BoxFactory.css';

import 'brace/mode/python';
import 'brace/theme/monokai';

import MaterialTableDemo from '../../_components/Utils/Table/Table2';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
}));

const TextEditors = ({
	dependencies,
	code,
	onChangeCodeScript,
	onChangeDependencies,
	onCickDisplayEditor,
	activeCodeEditor,
}) => {
	const classes = useStyles();
	return (
		<div className={'code-editors-admin'}>
			<div className='col-md-6 editor-column'>
				<Button
					onClick={() => onCickDisplayEditor('Dependencies')}
					id={'Dependencies'}
					variant='outlined'
					color='primary'
					className={classes.button}>
					Dependencies
				</Button>
				{activeCodeEditor['Dependencies'] ? (
					<AceEditor
						mode='python'
						theme='monokai'
						width={'350px'}
						height={'200px'}
						value={dependencies}
						onChange={onChangeDependencies}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
			<div className='col-md-6 editor-column'>
				<Button
					id={'PythonScript'}
					onClick={() => onCickDisplayEditor('PythonScript')}
					variant='outlined'
					color='primary'
					className={classes.button}>
					Python Script
				</Button>
				{activeCodeEditor['PythonScript'] ? (
					<AceEditor
						mode='python'
						theme='monokai'
						width={'650px'}
						height={'300px'}
						value={code}
						onChange={onChangeCodeScript}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
		</div>
	);
};

class BoxFactory extends React.Component {
	state = {
		code: '',
		dependencies: '',
		activeCodeEditor: { Dependencies: false, PythonScript: false },
		selectedTab: 0,
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

	setParamsState = data => {
		this.setState({ parameters: data });
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
			friendly_name,
			parameters,
		} = this.state;
		const box = {
			friendly_name,
			type,
			frontendVersion: 'V1',
			backendVersion: 'V1',
			n_input_ports: inputPorts,
			n_output_ports: outputPorts,
			depen_code: dependencies,
			python_code: code,
			parameters: JSON.stringify(parameters),
		};
		dispatch(adminActions.createBox(box));
	};

	onCickDisplayEditor = id => {
		this.setState(prevstate => {
			return {
				activeCodeEditor: {
					...prevstate.activeCodeEditor,
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
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							padding: 15,
						}}>
						<ButtonGonzalo onClick={this.handleSubmit} label={'Create Box'} />
					</div>
					<div className={'complete-fields-box'}>
						<form
							name='form'
							onSubmit={this.handleSubmit}
							className={'box-info-form'}>
							<TextField
								id='friendly_name'
								label='Fiendly Name'
								className={''}
								name={'friendly_name'}
								onChange={this.handleChange}
								margin='normal'
							/>
							<TextField
								id='type'
								label='Type'
								className={''}
								name={'type'}
								onChange={this.handleChange}
								margin='normal'
							/>
							<TextField
								id='inputPorts'
								label='Input'
								type='number'
								className={''}
								name={'inputPorts'}
								onChange={this.handleChange}
								margin='normal'
							/>
							<TextField
								id='outputPorts'
								label='Output'
								type='number'
								className={''}
								name={'outputPorts'}
								onChange={this.handleChange}
								margin='normal'
							/>
						</form>
						<div className={'table-wrapper'}>
							<MaterialTableDemo updateBoxState={this.setParamsState} />
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

const connectedAdminPage = connect(mapStateToProps)(BoxFactory);
export { connectedAdminPage as BoxFactory };
