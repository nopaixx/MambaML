import React from 'react';
import { Input } from '../../Utils/Input/Input';
import { Button } from '../../Utils/Button/Button';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

export class BoxInfo extends React.Component {
	state = { code: '', dependencies: '', selectedNode: '' };
	onChangeCodeScript = newValue => {
		this.setState({ code: newValue });
	};
	onChangeDependencies = newValue => {
		this.setState({ dependencies: newValue });
	};

	updateBoxInfo = () => {
		const { updateBox, chart } = this.props;
		const { code, dependencies } = this.state;
		const selectedId = chart.selected.id;

		chart.nodes[selectedId].properties.payload.code = code;
		chart.nodes[selectedId].properties.payload.dependencies = dependencies;

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
			const { code, ninput, nouts, code_depen } = node.properties.payload;
			this.setState({
				codeScript: code,
				dependencies: code_depen,
				inputPorts: ninput,
				outputPorts: nouts,
				selectedNode: selectedId,
			});
		}
	}

	render() {
		const { boxActions } = this.props;
		const { codeScript, dependencies, inputPorts, outputPorts } = this.state;
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
					{this.state.codeScript ? (
						<React.Fragment>
							<div>Python Code</div>
							<AceEditor
								mode="python"
								theme="monokai"
								width={'300px'}
								height={'300px'}
								value={codeScript}
								onChange={this.onChangeCode}
								name="UNIQUE_ID_OF_DIV"
								editorProps={{ $blockScrolling: true }}
							/>
							<br />
							<div>Python depen</div>
							<AceEditor
								mode="python"
								theme="monokai"
								width={'300px'}
								height={'200px'}
								value={dependencies}
								onChange={this.onChangeDependencies}
								name="UNIQUE_ID_OF_DIV"
								editorProps={{ $blockScrolling: true }}
							/>
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
