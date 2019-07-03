import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { adminActions } from '../../_actions';
import TextField from '@material-ui/core/TextField';
import TreeMenu from '../Design/TreeMenu/TreeMenuList';

import './BoxHospital.css';

import 'brace/mode/python';
import 'brace/theme/monokai';

import ParametersTable from '../../_components/Utils/Table/Table2';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
	inputText: {
		marginRight: 10,
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
			<div className='col-md-6 editor-column'>
				<Button
					id={'PythonScript'}
					onClick={() => onCickDisplayEditor('PythonScript')}
					variant='outlined'
					color='primary'
					className={classes.button}>
					Parameters
				</Button>
			</div>
		</div>
	);
};
const TextDataInputs = ({
	handleSubmit,
	handleChange,
	friendly_name,
	inputPorts,
	type,
	outputPorts,
}) => {
	const classes = useStyles();

	return (
		<div className={'complete-fields-box'}>
			<form name='form' onSubmit={handleSubmit} className={'box-info-form'}>
				<TextField
					id='friendly_name'
					label='Fiendly Name'
					className={classes.inputText}
					value={friendly_name || ''}
					name={'friendly_name'}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='type'
					label='Type'
					className={classes.inputText}
					value={type || ''}
					name={'type'}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='inputPorts'
					label='Input'
					type='number'
					className={classes.inputText}
					name={'inputPorts'}
					value={inputPorts || ''}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='outputPorts'
					label='Output'
					type='number'
					className={classes.inputText}
					name={'outputPorts'}
					value={outputPorts || ''}
					onChange={handleChange}
					margin='normal'
				/>
			</form>
		</div>
	);
};

class BoxHospital extends React.Component {
	state = {
		code: '',
		dependencies: '',
		activeCodeEditor: { Dependencies: false, PythonScript: false },
		selectedTab: 0,
	};
	// componentDidMount() {
	// 	const { dispatch } = this.props;
	// 	dispatch(projectActions.getAllActors());
	// }

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
			id,
		} = this.state;
		const updatedBox = {
			friendly_name,
			type,
			frontendVersion: 'V1',
			backendVersion: 'V1',
			n_input_ports: inputPorts,
			n_output_ports: outputPorts,
			depen_code: dependencies,
			python_code: code,
			parameters: JSON.stringify(parameters),
			id,
		};
		dispatch(adminActions.updateBox(updatedBox));
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
	selectedOption = item => {
		const { actorsList } = this.props;

		const { name } = item.payload;
		const selectedItem = actorsList.filter(
			actor => actor.friendly_name === name
		);
		const {
			type,
			n_output_ports,
			n_input_ports,
			parameters,
			python_code,
			depen_code,
			id,
		} = selectedItem[0];
		this.setState({
			type,
			inputPorts: n_input_ports,
			outputPorts: n_output_ports,
			code: python_code,
			dependencies: depen_code,
			friendly_name: name,
			parameters: JSON.parse(parameters),
			id,
		});
	};

	render() {
		const {
			friendly_name,
			type,
			code,
			inputPorts,
			outputPorts,
			dependencies,
			parameters,
			activeCodeEditor,
		} = this.state;
		const { actorsTree } = this.props;
		return (
			<React.Fragment>
				<Button
					id={'PythonScript'}
					onClick={this.handleSubmit}
					variant='contained'
					color='primary'>
					Update Box
				</Button>
				<div
					style={{
						display: 'flex',
					}}>
					<div className={'treeSelector'}>
						<TreeMenu data={actorsTree} selectedOption={this.selectedOption} />
					</div>
					<div className={'wrapper'}>
						<TextDataInputs
							handleChange={this.handleChange}
							friendly_name={friendly_name}
							type={type}
							inputPorts={inputPorts}
							outputPorts={outputPorts}
						/>
						<TextEditors
							dependencies={dependencies}
							code={code}
							onChangeCodeScript={this.onChangeCodeScript}
							onChangeDependencies={this.onChangeDependencies}
							onCickDisplayEditor={this.onCickDisplayEditor}
							activeCodeEditor={activeCodeEditor}
						/>
					</div>
				</div>
				<div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							padding: 15,
						}}
					/>
					<div className={'complete-fields-box'}>
						<div className={'table-wrapper'}>
							<ParametersTable
								updateBoxState={this.setParamsState}
								data={parameters}
							/>
						</div>
					</div>
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

const connectedAdminPage = connect(mapStateToProps)(BoxHospital);
export { connectedAdminPage as BoxHospital };
