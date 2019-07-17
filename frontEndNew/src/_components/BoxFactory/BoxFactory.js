import React from 'react';
import { connect } from 'react-redux';
import { adminActions } from '../../_actions';

import { CodeEditors } from './CodeEditorsFactory';
import { ParamsSelector } from '../Utils/Parameters/ParameterSelector';
import { TextDataInputs } from './TextDataInputs';
import './BoxFactory.css';

import Button from '@material-ui/core/Button';
import { Alert } from '../Utils/Alert/Alert';

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
		return (
			<div className={'box-factory-wrapper'}>
				<div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							padding: 15,
						}}>
						{/* {creatingBox ? (
							<Button
								onClick={this.handleSubmit}
								id={'Dependencies'}
								variant='contained'
								color='success'>
								Creating
							</Button>
						) : null} */}
						{boxCreated ? (
							<Button
								onClick={this.handleSubmit}
								id={'Dependencies'}
								variant='contained'
								color='secondary'>
								Created successfully
							</Button>
						) : (
							<Button
								onClick={this.handleSubmit}
								id={'Dependencies'}
								variant='contained'
								color='primary'>
								Create Box
							</Button>
						)}
						{/* {!boxCreated && !creatingBox ? (
							<Button
								onClick={this.handleSubmit}
								id={'Dependencies'}
								variant='contained'
								color='primary'>
								Create Box
							</Button>
						) : null} */}
					</div>
					{areEmptyFields ? <Alert text={'There are empty fields'} /> : null}
					<TextDataInputs handleChange={this.handleChange} />

					<CodeEditors
						dependencies={dependencies}
						code={code}
						onChangeCodeScript={this.onChangeCodeScript}
						onChangeDependencies={this.onChangeDependencies}
						onCickDisplayEditor={this.onCickDisplayEditor}
						activeCodeEditor={activeCodeEditor}
					/>
				</div>
				<ParamsSelector
					setParamsState={this.setParamsState}
					specialParamSelector={this.handleCsvSelector}
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
