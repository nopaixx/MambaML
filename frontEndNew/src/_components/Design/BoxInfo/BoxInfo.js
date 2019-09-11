import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

import { makeStyles } from '@material-ui/core/styles';

import { ParamsSelector } from '../../Utils/Parameters/ParameterSelector';
import { OutputSelector } from '../../Utils/Parameters/OutputSelector';
import JsonTable from '../../Utils/Table/JsonTable';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	ports: {
		width: 50,
		marginRight: 10,
		marginLeft: 10,
	},
}));

export const BoxInfo = props => {
	const classes = useStyles();

	const [code, setCode] = useState({
		script: '',
		dependencies: '',
		hasScript: false,
		scriptFullScreen: false,
		depenFullScreen: false,
	});
	const [params, setParams] = useState({
		parameters: [],
		fullScreen: false,
	});
	const [outputsTypes, setOutputs] = useState({
		outputsTypes: [],
		fullScreen: false,
	});
	const [ports, setPorts] = useState({
		input: '',
		output: '',
	});
	const [isConfigOpen, setConfigState] = useState(false);
	const [isJsonOpen, setJsonStatus] = useState(false);
	const [jsonParamData, setJsonParamData] = useState(false);

	const [selectedDataset, setDataset] = useState();
	const [selectedCols, setSelectedCols] = useState();
	// const [parameters, setParameters] = useState();
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
		let hasChange = false;
		// let hasChange = chart.nodes[selectedNode].properties.payload.hasChange
		if (selectedNode) {
			// let hasChange = chart.nodes[selectedNode].properties.payload.hasChange
			if (code.script && code.script.length > 0) {
				if (
					chart.nodes[selectedNode].properties.payload.python_code !==
					code.script
				) {
					hasChange = true;
				}
				chart.nodes[selectedNode].properties.payload.python_code = code.script;
			}
			if (code.dependencies) {
				if (
					chart.nodes[selectedNode].properties.payload.depen_code !==
					code.dependencies
				) {
					hasChange = true;
				}
				chart.nodes[selectedNode].properties.payload.depen_code =
					code.dependencies;
			}
			if (params.parameters) {
				if (
					!_.isEqual(
						JSON.parse(chart.nodes[selectedNode].properties.payload.parameters),
						params.parameters
					)
				) {
					hasChange = true;
				}
				chart.nodes[
					selectedNode
				].properties.payload.parameters = JSON.stringify(params.parameters);
			}
			if (outputsTypes.outputs) {
				if (
					!_.isEqual(
						JSON.parse(chart.nodes[selectedNode].properties.payload.outputs),
						outputsTypes.outputs
					)
				) {
					hasChange = true;
				}
				chart.nodes[selectedNode].properties.payload.outputs = JSON.stringify(
					outputsTypes.outputs
				);
			}
			chart.nodes[selectedNode].properties.payload.hasChange = hasChange;
		}
		updateBox(chart);
	};

	const handleDeleteBox = () => {
		setNode(undefined);
		boxActions.onDeleteKey();
	};

	const selectedDatasetOption = dataset => {
		if (dataset) {
			setDataset(dataset);
		}
	};
	const selectedColsInfo = selectedCols => {
		if (selectedCols) {
			setSelectedCols(selectedCols);
		}
	};

	// const setParamsState = data => {
	// 	setParameters(data);
	// };

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
				parameters,
				outputs,
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
			if (parameters) {
				setParams({
					...params,
					parameters: JSON.parse(parameters),
				});
			} else {
				setParams({
					...params,
					parameters: [],
				});
			}
			if (outputs) {
				setOutputs({
					...outputsTypes,
					outputs: JSON.parse(outputs),
				});
			} else {
				setOutputs({
					...outputsTypes,
					outputs: [],
				});
			}
		}
	}, [outputsTypes, params, props, selectedNode, updateBoxInfo]);

	const openScriptFullScreenMode = e => {
		const { updateProjectChart } = props;
		setCode({ ...code, scriptFullScreen: !code.scriptFullScreen });
		updateBoxInfo();
		updateProjectChart();
	};
	const openDepenFullScreenMode = e => {
		const { updateProjectChart } = props;
		setCode({ ...code, depenFullScreen: !code.depenFullScreen });
		updateBoxInfo();
		updateProjectChart();
	};
	const openParamsFullScreenMode = e => {
		setParams({ ...params, fullScreen: !params.fullScreen });
		updateBoxInfo();
	};
	const openOutputsFullScreenMode = e => {
		setOutputs({ ...outputsTypes, fullScreen: !outputsTypes.fullScreen });
		updateBoxInfo();
	};
	const updateParams = data => {
		const { updateProjectChart } = props;
		setParams({ ...params, parameters: data });
		updateBoxInfo();
		updateProjectChart();
	};
	const updateOutputs = data => {
		const { updateProjectChart } = props;
		setOutputs({ ...outputsTypes, outputs: data });
		updateBoxInfo();
		updateProjectChart();
	};

	const { boxActions } = props;

	const selected = props.chart.selected.id;
	const node = props.chart.nodes[selected];
	let nodeName;

	const OutputsTypesComponent = () => {
		return (
			<div
				style={
					outputsTypes.fullScreen
						? {
								position: 'absolute',
								left: 0,
								top: 0,
								width: window.innerWidth,
								height: window.innerHeight,
								backgroundColor: 'rgba(255, 255, 255, 0.8)',
								zIndex: 1300,
						  }
						: {}
				}>
				<Button
					onClick={openOutputsFullScreenMode}
					variant='outlined'
					color='primary'
					className={classes.button}>
					{outputsTypes.fullScreen ? 'Close Outputs' : 'Open Outputs'}
				</Button>
				{outputsTypes.fullScreen ? (
					<React.Fragment>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								padding: 60,
							}}>
							<OutputSelector
								setOutputState={updateOutputs}
								data={outputsTypes.outputs}
							/>
						</div>
					</React.Fragment>
				) : null}
			</div>
		);
	};

	const CodeScriptComponent = () => {
		return (
			<div
				id='pythonCode'
				style={
					code.scriptFullScreen
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
				<Button
					onClick={openScriptFullScreenMode}
					variant='outlined'
					color='primary'
					className={classes.button}>
					{code.scriptFullScreen ? 'Close Python Code' : 'Open Python Code'}
				</Button>
				{code.scriptFullScreen ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}>
						<AceEditor
							mode='python'
							theme='monokai'
							width={'80vw'}
							height={'80vh'}
							value={code.script}
							onChange={onChangeCodeScript}
							name='UNIQUE_ID_OF_DIV'
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
				) : null}
			</div>
		);
	};

	const PythonCodeComponent = () => {
		return (
			<div
				id='pythonCode'
				style={
					code.depenFullScreen
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
				<Button
					onClick={openDepenFullScreenMode}
					variant='outlined'
					color='primary'
					className={classes.button}>
					{code.depenFullScreen ? 'Close Dependecies' : 'Open Dependecies'}
				</Button>
				{code.depenFullScreen ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}>
						<AceEditor
							id={'pythonDepen'}
							mode='python'
							theme='monokai'
							width={'80vw'}
							height={'80vh'}
							value={code.dependencies}
							onChange={onChangeDependencies}
							name='UNIQUE_ID_OF_DIV'
							editorProps={{ $blockScrolling: true }}
						/>
					</div>
				) : null}
			</div>
		);
	};

	const ParamsComponent = () => {
		return (
			<div
				style={
					params.fullScreen
						? {
								position: 'absolute',
								left: 0,
								top: 0,
								width: window.innerWidth,
								height: window.innerHeight,
								backgroundColor: 'rgba(255, 255, 255, 0.8)',
								zIndex: 1300,
						  }
						: {}
				}>
				<Button
					onClick={openParamsFullScreenMode}
					variant='outlined'
					color='primary'
					className={classes.button}>
					{params.fullScreen ? 'Close Params' : 'Open Params'}
				</Button>
				{params.fullScreen ? (
					<React.Fragment>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								padding: 60,
							}}>
							<ParamsSelector
								selectedDataset={selectedDatasetOption}
								setParamsState={updateParams}
								dataset={selectedDataset}
								data={params.parameters}
								nodeInfo={node}
								chartInfo={props.chart}
								selectedCols={selectedCols}
								selectedColsInfo={selectedColsInfo}
							/>
						</div>
					</React.Fragment>
				) : null}
			</div>
		);
	};

	const ConfigMenu = () => {
		return (
			<>
				<ParamsComponent />
				<OutputsTypesComponent />
				{code.hasScript ? (
					<>
						<CodeScriptComponent />
						<PythonCodeComponent />
					</>
				) : null}
			</>
		);
	};
	// const handleClickJson = param => {
	// 	setJsonStatus(true);
	// 	const jsonData = JSON.parse(param.value);
	// 	const newData = [];
	// 	const newColumns = [];
	// 	jsonData.forEach(item1 => {
	// 		const jsonKeys = Object.keys(item1);
	// 		jsonKeys.forEach(item => {
	// 			console.log('item', item);
	// 			newData.push({ [item]: jsonData[item] });
	// 			newColumns.push({ title: item, filed: item });
	// 		});
	// 	});
	// 	console.log('handleClickJson', newData);
	// 	setJsonParamData({ newData, newColumns });
	// };

	const handleChangeParam = value => {
		params.parameters.forEach(param => {});
	};

	if (node && node.properties.payload.name) {
		const nodeSplitName = node.properties.payload.name.split('-');
		nodeName = nodeSplitName[nodeSplitName.length - 1];
	}

	if (node) {
		return (
			<div className={'BoxInfo'}>
				<div>
					<h3>{nodeName || node.type || ''}</h3>
				</div>
				<div>
					Params:
					{Array.isArray(params.parameters) && params.parameters
						? params.parameters.map((param, key) => {
								return (
									<div
										key={key}
										style={{ display: 'flex', flexDirection: 'column' }}>
										<input
											value={param.param_friend_name}
											onChange={handleChangeParam}
										/>
										{/* {param.type === 'json' ? (
									<div onClick={() => handleClickJson(param)}>
										{param.value}
									</div>
								) : ( */}
										<input value={param.value} />
										{/* )} */}
									</div>
								);
						  })
						: null}
				</div>
				<div
					style={
						isJsonOpen
							? {
									position: 'absolute',
									left: '20vw',
									top: '20vh',
									backgroundColor: 'rgba(255, 255, 255, 0.8)',
									zIndex: 1300,
							  }
							: {}
					}>
					{isJsonOpen ? (
						<JsonTable
							data={jsonParamData.newData}
							columns={jsonParamData.newColumns}
						/>
					) : null}
				</div>
				<div>
					<div>
						<div onClick={() => setConfigState(!isConfigOpen)}>
							Advance settings
							<Icon>
								{isConfigOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
							</Icon>
						</div>
						<Collapse in={isConfigOpen}>
							<ConfigMenu />
						</Collapse>
					</div>
					<Button
						onClick={handleDeleteBox}
						variant='contained'
						color='primary'
						className={classes.button}>
						Delete
					</Button>
					<Button
						onClick={updateBoxInfo}
						variant='outlined'
						color='primary'
						className={classes.button}>
						Update
					</Button>
				</div>
			</div>
		);
	} else {
		return null;
	}
};
