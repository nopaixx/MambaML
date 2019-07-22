import React from 'react';
import { connect } from 'react-redux';
import { adminActions } from '../../_actions';
import TreeMenu from '../Design/TreeMenu/TreeMenuList';

import { TextDataInputs } from './TextDataInputs';
import { TextEditors } from './TextEditors';

import './BoxHospital.css';

import ParametersTable from '../../_components/Utils/Table/ParametersTable';

import Button from '@material-ui/core/Button';

class BoxHospital extends React.Component {
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
	handleExportBox = e => {
	     const { dispatch } = this.props;
	     e.preventDefault()
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
                const exportedBox = {
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

		adminActions.exportBox(exportedBox)
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
				<div
					style={{
						display: 'flex',
					}}>
					<div className={'treeSelector'}>
						<TreeMenu data={actorsTree} selectedOption={this.selectedOption} />
					</div>
					<div style={{ margin: 'auto' }}>
						<div className={'wrapper'}>
							<div className={'updateButton'}>
								<Button
									id={'PythonScript'}
									onClick={this.handleSubmit}
									variant='contained'
									color='primary'>
									Update Box
								</Button>
								<Button
									id={'ExportBox'}
									onClick={this.handleExportBox}
									variant='contained'
									color='primary'
								>
									Export Box
								</Button>
							</div>
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
						<div className={'complete-fields-box'}>
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
