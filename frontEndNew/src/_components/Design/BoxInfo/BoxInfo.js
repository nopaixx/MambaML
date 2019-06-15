import React from 'react';
import { Input } from '../../Utils/Input/Input';
import { Button } from '../../Utils/Button/Button';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

export class BoxInfo extends React.Component {
	state = { codeScript: ' ', dependencies: '', selectedNode: '' };

	onChangeCodeScript = newValue => {
		this.setState({ codeScript: newValue });
	};
	onChangeDependencies = newValue => {
		this.setState({ dependencies: newValue });
	};

	updateBoxInfo = () => {
		const { updateBox, chart } = this.props;
		const { codeScript, dependencies, selectedId } = this.state;
		if (selectedId) {
			if (codeScript && codeScript.length > 0) {
				chart.nodes[selectedId].properties.payload.python_code = codeScript;
			}
			if (dependencies) {
				chart.nodes[selectedId].properties.payload.dependencies = dependencies;
			}
		}
		updateBox(chart);
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	componentDidUpdate(prevProps) {
		const { chart } = this.props;
		const prevSelectedId = prevProps.chart.selected.id;
		const selectedId = chart.selected.id;
		const node = chart.nodes[selectedId];

		if (prevSelectedId !== this.state.selectedNode && node) {
			this.updateBoxInfo();
			const {
				python_code,
				n_input_ports,
				n_output_ports,
				depen_code,
			} = node.properties.payload;

			const hasCode = typeof python_code !== 'undefined';
			this.setState({
				codeScript: python_code,
				dependencies: depen_code,
				inputPorts: n_input_ports,
				outputPorts: n_output_ports,
				selectedNode: selectedId,
				selectedId,
				hasCode,
			});
		}
	}

	openFullScreenMode = e => {
		const id = e.target.id;
		const { pythonCode } = this.state;
		console.log('id', id);
		this.setState({ [id]: !pythonCode });
	};

	render() {
		const { boxActions } = this.props;
		const {
			codeScript,
			dependencies,
			inputPorts,
			outputPorts,
			hasCode,
			pythonCode,
		} = this.state;

		const selected = this.props.chart.selected.id;
		const node = this.props.chart.nodes[selected];

		if (node) {
			return (
				<div className={'BoxInfo'}>
					<h3>{node.type || ''}</h3>
					Input Ports:
					<Input
						type="number"
						name="inputPorts"
						value={inputPorts || 0}
						onChange={this.handleChange}
					/>
					<br />
					Output Ports:
					<Input
						type="number"
						value={outputPorts || 0}
						name="outputPorts"
						onChange={this.handleChange}
					/>
					<br />
					{hasCode ? (
						<React.Fragment>
							<div>Python Code</div>
							<div
								id="pythonCode"
								onClick={this.openFullScreenMode}
								style={
									pythonCode
										? {
												position: 'absolute',
												left: 0,
												top: 0,
												width: window.innerWidth,
												height: window.innerHeight,
												backgroundColor: 'rgba(255, 255, 255, 0.8)',
												zIndex: 9999,
										  }
										: {}
								}>
								x<div>Python Code</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
									}}>
									<AceEditor
										mode="python"
										theme="monokai"
										width={!pythonCode ? '300px' : '80vh'}
										height={!pythonCode ? '300px' : '80vh'}
										value={codeScript}
										onChange={this.onChangeCodeScript}
										name="UNIQUE_ID_OF_DIV"
										editorProps={{ $blockScrolling: true }}
									/>
								</div>
							</div>
							<br />
							<div>Python depen</div>
							<div>
								<AceEditor
									id={'pythonDepen'}
									mode="python"
									theme="monokai"
									width={'300px'}
									height={'200px'}
									value={dependencies}
									onChange={this.onChangeDependencies}
									name="UNIQUE_ID_OF_DIV"
									editorProps={{ $blockScrolling: true }}
								/>
							</div>
						</React.Fragment>
					) : (
						''
					)}
					<Button onClick={() => boxActions.onDeleteKey()} label={'delete'} />
					<Button label={'update'} onClick={this.updateBoxInfo} />
				</div>
			);
		} else {
			return null;
		}
	}
}
