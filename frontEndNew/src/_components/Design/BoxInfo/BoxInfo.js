import React from 'react';
import { Input } from '../../Utils/Input/Input';
import { Button } from '../../Utils/Button/Button';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

export class BoxInfo extends React.Component {
	state = { code: '', dependencies: '' };
	onChangeCodeScript = newValue => {
		this.setState({ code: newValue });
	};
	onChangeDependencies = newValue => {
		this.setState({ dependencies: newValue });
	};

	updateBoxInfo = () => {
		const { updateBox } = this.props;
		const { code, dependencies } = this.state;
		updateBox(code, dependencies);
	};

	render() {
		const { boxActions } = this.props;
		const selected = this.props.chart.selected.id;
		const node = this.props.chart.nodes[selected];
		if (node) {
			let codeScript;
			let dependencies;
			let inputPorts;
			let outputPorts;
			if (node.properties.payload) {
				const { code, ninput, nouts, code_depen } = node.properties.payload;
				codeScript = code;
				dependencies = code_depen;
				inputPorts = ninput;
				outputPorts = nouts;
			}
			return (
				<div className={'BoxInfo'}>
					<h3>{node.type || ''}</h3>
					Input Ports:
					<Input type="number" key={inputPorts} defaultValue={inputPorts} />
					<br />
					Output Ports:
					<Input type="number" key={outputPorts} defaultValue={outputPorts} />
					<br />
					{codeScript ? (
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
