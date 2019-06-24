import React, { useState, useEffect } from 'react';
import { Input } from '../../Utils/Input/Input';
import { Button } from '../../Utils/Button/Button';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

export const BoxInfo = props => {
	const [code, setCode] = useState({
		script: '',
		dependencies: '',
		hasScript: false,
		fullScreen: false,
	});
	const [ports, setPorts] = useState({
		input: '',
		output: '',
	});
	const [selectedNode, setNode] = useState();
	const onChangeCodeScript = newValue => {
		setCode({ ...code, script: newValue });
	};
	const onChangeDependencies = newValue => {
		setCode({ ...code, dependencies: newValue });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateBoxInfo = () => {
		const { updateBox, chart } = props;
		if (selectedNode) {
			if (code.script && code.script.length > 0) {
				chart.nodes[selectedNode].properties.payload.python_code = code.script;
			}
			if (code.dependencies) {
				chart.nodes[selectedNode].properties.payload.dependencies =
					code.dependencies;
			}
		}
		updateBox(chart);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setPorts({ ...ports, [name]: value });
	};

	useEffect(() => {
		const { chart } = props;
		const prevSelectedId = props.chart.selected.id;
		const selectedId = chart.selected.id;
		const node = chart.nodes[selectedId];
		if (prevSelectedId !== selectedNode && node) {
			updateBoxInfo();
			const {
				python_code,
				n_input_ports,
				n_output_ports,
				depen_code,
			} = node.properties.payload;
			const hasScript = typeof python_code !== 'undefined';
			setCode({
				script: python_code,
				dependencies: depen_code,
				hasScript,
			});
			setNode(selectedId);
			setPorts({
				input: n_input_ports,
				output: n_output_ports,
			});
		}
	}, [props, selectedNode, updateBoxInfo]);

	const openFullScreenMode = e => {
		setCode({ ...code, fullScreen: !code.fullScreen });
	};

	const { boxActions } = props;

	const selected = props.chart.selected.id;
	const node = props.chart.nodes[selected];

	if (node) {
		return (
			<div className={'BoxInfo'}>
				<h3>{node.type || ''}</h3>
				Input Ports:
				<Input
					type='number'
					name='input'
					value={ports.input || 0}
					onChange={handleChange}
				/>
				<br />
				Output Ports:
				<Input
					type='number'
					value={ports.output || 0}
					name='output'
					onChange={handleChange}
				/>
				<br />
				{code.hasScript ? (
					<React.Fragment>
						<div>Python Code</div>
						<div
							id='pythonCode'
							style={
								code.fullScreen
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
							x<div onClick={openFullScreenMode}>Python Code</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
								}}>
								<AceEditor
									mode='python'
									theme='monokai'
									width={!code.fullScreen ? '300px' : '80vh'}
									height={!code.fullScreen ? '300px' : '80vh'}
									value={code.script}
									onChange={onChangeCodeScript}
									name='UNIQUE_ID_OF_DIV'
									editorProps={{ $blockScrolling: true }}
								/>
							</div>
						</div>
						<br />
						<div>Python depen</div>
						<div>
							<AceEditor
								id={'pythonDepen'}
								mode='python'
								theme='monokai'
								width={'300px'}
								height={'200px'}
								value={code.dependencies}
								onChange={onChangeDependencies}
								name='UNIQUE_ID_OF_DIV'
								editorProps={{ $blockScrolling: true }}
							/>
						</div>
					</React.Fragment>
				) : (
					''
				)}
				<Button onClick={() => boxActions.onDeleteKey()} label={'delete'} />
				<Button label={'update'} onClick={updateBoxInfo} />
			</div>
		);
	} else {
		return null;
	}
};
