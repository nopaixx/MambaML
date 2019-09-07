import React from 'react';
import { connect } from 'react-redux';
import { adminActions } from '../../_actions';
import TreeMenu from '../Design/TreeMenu/TreeMenuList';
import styled from 'styled-components';

import { TextDataInputs } from './TextDataInputs';
import { TextEditors } from './TextEditors';

import ParametersTable from '../../_components/Utils/Table/ParametersTable';
import OutputTable from '../../_components/Utils/Table/OutputTable';

import Button from '@material-ui/core/Button';

const ParamTableWrapper = styled.div`
	margin-right: 5px;
	width: 60%;
	max-width: 750px;
`;
const OutputTableWrapper = styled.div`
	margin-right: 5px;
	width: 30%;
`;
const TablesRow = styled.div`
	display: flex;
	justify-content: space-evenly;
`;
const BoxTreeWrapper = styled.div`
	overflow: scroll;
	max-height: 100vh;
	border: 1px solid rgb(204, 204, 204);
`;
const UpdateButtonsWrappers = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 30px;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

class BoxHospital extends React.Component {
	state = {
		code: '',
		dependencies: '',
		activeCodeEditor: { Dependencies: true, PythonScript: true },
		selectedTab: 0,
		step: 0,
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
	setOutputState = data => {
		this.setState({ selectedOutputType: data });
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
			outputs: JSON.stringify(selectedOutputType),
			id,
		};
		dispatch(adminActions.updateBox(updatedBox));
	};
	handleExportBox = e => {
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
			outputs: JSON.stringify(selectedOutputType),
			id,
		};

		adminActions.exportBox(exportedBox);
	};
	onCickDisplayEditor = id => {
		// this.setState(prevstate => {
		// 	return {
		// 		activeCodeEditor: {
		// 			...prevstate.activeCodeEditor,
		// 			[id]: !prevstate.activeCodeEditor[id],
		// 		},
		// 	};
		// });
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
			outputs,
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
			selectedOutputType: JSON.parse(outputs),
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
			selectedOutputType,
		} = this.state;
		const { actorsTree } = this.props;
		return (
			<React.Fragment>
				<div
					style={{
						display: 'flex',
					}}>
					<BoxTreeWrapper>
						<TreeMenu data={actorsTree} selectedOption={this.selectedOption} />
					</BoxTreeWrapper>
					<div style={{ width: '100%' }}>
						<Wrapper>
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
							/>
						</Wrapper>
						<TablesRow>
							<OutputTableWrapper>
								<OutputTable
									updateBoxState={this.setOutputState}
									data={selectedOutputType || []}
								/>
							</OutputTableWrapper>
							<ParamTableWrapper>
								<ParametersTable
									updateBoxState={this.setParamsState}
									data={parameters || []}
								/>
							</ParamTableWrapper>
						</TablesRow>
						<UpdateButtonsWrappers>
							<Button
								id={'ExportBox'}
								onClick={this.handleExportBox}
								variant='contained'
								color='primary'>
								Export Box
							</Button>
							<Button
								id={'PythonScript'}
								onClick={this.handleSubmit}
								variant='contained'
								color='primary'>
								Update Box
							</Button>
						</UpdateButtonsWrappers>
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
