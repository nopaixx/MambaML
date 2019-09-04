import React from 'react';
import { connect } from 'react-redux';
import { adminActions } from '../../_actions';

import { CodeEditors } from './CodeEditorsFactory';
import { ParamsSelector } from '../Utils/Parameters/ParameterSelector';
import { OutputSelector } from '../Utils/Parameters/OutputSelector';
import { TextDataInputs } from './TextDataInputs';
import './BoxFactory.css';

import Button from '@material-ui/core/Button';

import { Alert } from '../Utils/Alert/Alert';

import styled from 'styled-components';

const CanvasOuterCustom = styled.div`
	position: relative;
	background-size: 10px 10px;
	background-color: #d38c8c;
	background-image: linear-gradient(
			90deg,
			hsla(0, 0%, 100%, 0.1) 1px,
			transparent 0
		),
		linear-gradient(180deg, hsla(0, 0%, 100%, 0.1) 1px, transparent 0);
	width: 100%;
	height: 100%;
	overflow: hidden;
	cursor: not-allowed;
`;

class BoxFactoryNormal extends React.Component {
	state = {
		code: '',
		dependencies: '',
		selectedTab: 0,
		hasChanged: false,
		areEmptyFields: false,
		isCsvSelectorActive: false,
		step: 1,
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
	setOutputState = data => {
		this.setState({ selectedOutputType: data });
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
			selectedOutputType,
		} = this.state;
		if (type && inputPorts && outputPorts && friendly_name) {
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
				outputs: JSON.stringify(selectedOutputType),
			};
			dispatch(adminActions.createBox(box));
		} else {
			this.setState({ areEmptyFields: true });
		}
	};

	handleImportBox = e => {
		e.preventDefault();
		adminActions.importBox();
	};

	handleCsvSelector = () => {
		this.setState(state => {
			return { isCsvSelectorActive: !state.isCsvSelectorActive };
		});
	};

	render() {
		const {
			code,
			dependencies,
			areEmptyFields,
			selectedDataset,
			parameters,
			selectedOutputType,
		} = this.state;
		const { boxCreated } = this.props;
		return (
			<div className={'box-factory-wrapper'}>
				<div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<TextDataInputs
							handleChange={this.handleChange}
							values={this.state}
						/>
						or
						<div style={{ width: 200 }}>
							<Button
								onClick={this.handleImportBox}
								id={'ImportBox'}
								variant='contained'
								color='primary'>
								Import Box From Computer
							</Button>
						</div>
					</div>
					<CodeEditors
						dependencies={dependencies}
						code={code}
						onChangeCodeScript={this.onChangeCodeScript}
						onChangeDependencies={this.onChangeDependencies}
					/>
					<div style={{ display: 'flex' }}>
						<ParamsSelector
							setParamsState={this.setParamsState}
							specialParamSelector={this.handleCsvSelector}
							dataset={selectedDataset}
							data={parameters}
						/>
						<OutputSelector
							setOutputState={this.setOutputState}
							data={selectedOutputType}
						/>
					</div>
					{boxCreated ? (
						<Button
							onClick={this.handleSubmit}
							variant='contained'
							color='secondary'>
							Created successfully
						</Button>
					) : (
						<div
							style={{
								justifyContent: 'center',
								display: 'flex',
								padding: 30,
							}}>
							{areEmptyFields ? (
								<Alert text={'There are empty fields, please fill them'} />
							) : (
								<Button
									onClick={this.handleSubmit}
									variant='contained'
									color='primary'>
									Create Box
								</Button>
							)}
						</div>
					)}
				</div>
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

const connectedAdminPage = connect(mapStateToProps)(BoxFactoryNormal);
export { connectedAdminPage as BoxFactoryNormal };
