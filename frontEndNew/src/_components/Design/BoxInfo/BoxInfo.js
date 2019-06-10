import React from 'react';
import { Input } from '../../Utils/Input/Input';
import { Button } from '../../Utils/Button/Button';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

export const BoxInfo = props => {
	if (!props) {
		return null;
	}
	const selected = props.chart.selected.id;
	const node = props.chart.nodes[selected];
	if (node) {
		let codeScript;
		let inputPorts;
		let outputPorts;
		if (node.properties.payload) {
			const { code, ninput, nouts } = node.properties.payload;
			codeScript = code;
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
					<AceEditor
						mode="python"
						theme="monokai"
						width={'300px'}
						height={'300px'}
						value={codeScript}
						//onChange={''}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
				) : (
					''
				)}
				<Button label={'update'} />
			</div>
		);
	}
	return null;
};
