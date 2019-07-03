import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { adminActions } from '../../_actions';
import { DATASETS } from '../../_constants';
import TextField from '@material-ui/core/TextField';
import Dropdown from '../Utils/Dropdown/Dropdown';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './BoxFactory.css';

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
						width={'50vw'}
						height={'300px'}
						className={'codeEditor'}
						value={code}
						onChange={onChangeCodeScript}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
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
						width={'40vw'}
						height={'200px'}
						className={'codeEditor'}
						value={dependencies}
						onChange={onChangeDependencies}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
		</div>
	);
};

const TextDataInputs = ({ handleSubmit, handleChange }) => {
	const classes = useStyles();

	return (
		<div className={'complete-fields-box'}>
			<form name='form' onSubmit={handleSubmit} className={'box-info-form'}>
				<TextField
					id='friendly_name'
					label='Fiendly Name'
					className={classes.inputText}
					name={'friendly_name'}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='type'
					label='Type'
					className={classes.inputText}
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
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					id='outputPorts'
					label='Output'
					type='number'
					className={classes.inputText}
					name={'outputPorts'}
					onChange={handleChange}
					margin='normal'
				/>
			</form>
		</div>
	);
};

const ParamsSelector = ({
	selectedDataset,
	setParamsState,
	specialParamSelector,
	isCsvSelectorActive,
	dataset,
}) => {
	const [open, setOpen] = useState(false);
	const [option, setOption] = useState();

	useEffect(() => {
		if (isCsvSelectorActive) {
			setOpen(true);
		}
	}, [isCsvSelectorActive, open]);

	function handleClose() {
		specialParamSelector();
		setOpen(false);
	}
	function handleConfirm() {
		selectedDataset(option);
		specialParamSelector();
		setOpen(false);
	}

	return (
		<div className={'param-selector-wrapper'}>
			<div className={'table-wrapper'}>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>{'Select Data Set'}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							Select the Data set you want to include
						</DialogContentText>
						<Dropdown
							options={DATASETS}
							name={'Data sets'}
							selectedOptions={option => setOption(option)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleConfirm} color='primary' autoFocus>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
				<ParametersTable
					specialParamSelector={specialParamSelector}
					updateBoxState={setParamsState}
					dataset={dataset}
				/>
			</div>
		</div>
	);
};

class BoxFactory extends React.Component {
	state = {
		code: '',
		dependencies: '',
		activeCodeEditor: { Dependencies: true, PythonScript: true },
		selectedTab: 0,
		hasChanged: false,
		areEmptyFields: false,
		isCsvSelectorActive: false,
	};

	onChangeCodeScript = newValue => {
		this.setState({ code: newValue });
	};

	onChangeDependencies = newValue => {
		this.setState({ dependencies: newValue });
	};

	handleChange = e => {
		const { dispatch } = this.props;
		const { hasChanged } = this.state;
		const { name, value } = e.target;
		this.setState({ [name]: value });
		if (!hasChanged) {
			this.setState({ hasChanged: true });
			dispatch(adminActions.restartBoxFactory());
		}
	};

	setParamsState = data => {
		this.setState({ parameters: data });
	};

	selectedDataset = dataset => {
		if (dataset) {
			this.setState({ selectedDataset: dataset });
		}
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
		if (
			type &&
			inputPorts &&
			outputPorts &&
			code &&
			dependencies &&
			friendly_name
		) {
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
		} else {
			this.setState({ areEmptyFields: true });
		}
	};

	handleCsvSelector = () => {
		this.setState(state => {
			return { isCsvSelectorActive: !state.isCsvSelectorActive };
		});
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
		const {
			code,
			dependencies,
			activeCodeEditor,
			areEmptyFields,
			isCsvSelectorActive,
			selectedDataset,
		} = this.state;
		const { creatingBox, boxCreated } = this.props;
		//TODO creating and created verification
		console.log(creatingBox, boxCreated, selectedDataset);
		return (
			<div className={'box-factory-wrapper'}>
				<div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							padding: 15,
						}}>
						<Button
							onClick={this.handleSubmit}
							id={'Dependencies'}
							variant='contained'
							color='primary'>
							Create Box
						</Button>
					</div>
					{/* TODO: put style to the alert and create component*/}
					{areEmptyFields ? (
						<div
							style={{
								width: '30vw',
								border: '1px solid red',
								color: 'red',
								textAlign: 'center',
							}}>
							There are empty fields
						</div>
					) : null}
					<TextDataInputs handleChange={this.handleChange} />
					<TextEditors
						dependencies={dependencies}
						code={code}
						onChangeCodeScript={this.onChangeCodeScript}
						onChangeDependencies={this.onChangeDependencies}
						onCickDisplayEditor={this.onCickDisplayEditor}
						activeCodeEditor={activeCodeEditor}
					/>
				</div>
				<ParamsSelector
					selectedDataset={this.selectedDataset}
					setParamsState={this.setParamsState}
					specialParamSelector={this.handleCsvSelector}
					isCsvSelectorActive={isCsvSelectorActive}
					dataset={selectedDataset}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { creatingBox, boxCreated } = state.admin;
	const { user } = authentication;
	return {
		user,
		users,
		creatingBox,
		boxCreated,
	};
}

const connectedAdminPage = connect(mapStateToProps)(BoxFactory);
export { connectedAdminPage as BoxFactory };
