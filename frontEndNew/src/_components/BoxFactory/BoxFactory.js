import React from 'react';
import { connect } from 'react-redux';
import { adminActions } from '../../_actions';

import { CodeEditors } from './CodeEditorsFactory';
import { ParamsSelector } from '../Utils/Parameters/ParameterSelector';
import { TextDataInputs } from './TextDataInputs';
import './BoxFactory.css';
import { BallsSlider } from './BallsSlider';

import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

import { Alert } from '../Utils/Alert/Alert';
import { width } from '@material-ui/system';

class BoxFactory extends React.Component {
	state = {
		code: '',
		dependencies: '',
		activeCodeEditor: { Dependencies: true, PythonScript: true },
		selectedTab: 0,
		hasChanged: false,
		areEmptyFields: false,
		isCsvSelectorActive: false,
		step: 0,
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

	handleImportBox = e => {
		const { dispatch } = this.props;
		e.preventDefault();
		adminActions.importBox();
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

	handleStep = e => {
		console.log(e.currentTarget);
		const action = e.currentTarget.id;
		switch (action) {
			case 'next':
				this.setState(prevState => {
					console.log(prevState);
					return {
						step: prevState.step + 1,
					};
				});
				break;
			case 'prev':
				this.setState(prevState => {
					return {
						step: prevState.step - 1,
					};
				});
				break;
			default:
				break;
		}
	};

	render() {
		const {
			code,
			dependencies,
			activeCodeEditor,
			areEmptyFields,
			isCsvSelectorActive,
			selectedDataset,
			step,
		} = this.state;
		const { creatingBox, boxCreated } = this.props;
		return (
			<div className={'box-factory-wrapper'}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						height: '60vh',
						marginTop: 10,
					}}>
					<Button
						id={'prev'}
						onClick={this.handleStep}
						variant='contained'
						color='primary'>
						Prev Step
					</Button>
					<div style={{ width: '90vw' }}>
						{areEmptyFields ? <Alert text={'There are empty fields'} /> : null}
						{step === 1 ? (
							<Slide
								direction='right'
								in={step === 1}
								mountOnEnter
								unmountOnExit>
								<Paper elevation={0} className={'classes.paper'}>
									<TextDataInputs handleChange={this.handleChange} />
								</Paper>
							</Slide>
						) : null}
						{step === 2 ? (
							<Slide
								direction='right'
								in={step === 2}
								mountOnEnter
								unmountOnExit>
								<Paper elevation={0} className={'classes.paper'}>
									<CodeEditors
										dependencies={dependencies}
										code={code}
										onChangeCodeScript={this.onChangeCodeScript}
										onChangeDependencies={this.onChangeDependencies}
										onCickDisplayEditor={this.onCickDisplayEditor}
										activeCodeEditor={activeCodeEditor}
									/>
								</Paper>
							</Slide>
						) : null}
						{step === 3 ? (
							<Slide
								direction='right'
								in={step === 3}
								mountOnEnter
								unmountOnExit>
								<Paper elevation={0} className={'classes.paper'}>
									<ParamsSelector
										setParamsState={this.setParamsState}
										specialParamSelector={this.handleCsvSelector}
										dataset={selectedDataset}
									/>
								</Paper>
							</Slide>
						) : null}
						{step === 4 ? (
							boxCreated ? (
								<Button
									onClick={this.handleSubmit}
									id={'Dependencies'}
									variant='contained'
									color='secondary'>
									Created successfully
								</Button>
							) : (
								<div>
									<Button
										onClick={this.handleSubmit}
										id={'Dependencies'}
										variant='contained'
										color='primary'>
										Create Box
									</Button>
									<Button
										onClick={this.handleImportBox}
										id={'ImportBox'}
										variant='contained'
										color='primary'>
										Import Box
									</Button>
								</div>
							)
						) : null}
					</div>
					<Button
						id={'next'}
						onClick={this.handleStep}
						variant='contained'
						color='primary'>
						Next Step
					</Button>
				</div>
				<BallsSlider step={step} />
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
