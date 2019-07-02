import React, { useState, useEffect } from 'react';

import { Input } from '../../Utils/Input/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

import { makeStyles } from '@material-ui/core/styles';
import MaterialTableDemo from '../../Utils/Table/Table2';

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
			if (params.parameters) {
				chart.nodes[
					selectedNode
				].properties.payload.parameters = JSON.stringify(params.parameters);
			}
		}
		updateBox(chart);
	};

	const handleDeleteBox = () => {
		setNode(undefined);
		boxActions.onDeleteKey();
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
				parameters,
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
			}
		}
	}, [params, props, selectedNode, updateBoxInfo]);

	const openScriptFullScreenMode = e => {
		setCode({ ...code, scriptFullScreen: !code.scriptFullScreen });
	};
	const openDepenFullScreenMode = e => {
		setCode({ ...code, depenFullScreen: !code.depenFullScreen });
	};
	const openParamsFullScreenMode = e => {
		setParams({ ...params, fullScreen: !params.fullScreen });
	};
	const updateParams = data => {
		setParams({ ...params, parameters: data });
	};

	const { boxActions } = props;

	const selected = props.chart.selected.id;
	const node = props.chart.nodes[selected];
	let nodeName;

	if (node && node.properties.payload.name) {
		const nodeSplitName = node.properties.payload.name.split('-');
		nodeName = nodeSplitName[nodeSplitName.length - 1];
	}
	if (node) {
		return (
			<div className={'BoxInfo'}>
				<h3>{nodeName || node.type || ''}</h3>
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
									zIndex: 9999,
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
								}}
								onBlur={() => console.log('blur')}>
								<MaterialTableDemo
									data={params.parameters}
									updateBoxState={updateParams}
								/>
							</div>
						</React.Fragment>
					) : null}
				</div>

				<br />
				{code.hasScript ? (
					<React.Fragment>
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
								{code.scriptFullScreen
									? 'Close Python Code'
									: 'Open Python Code'}
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
								{code.depenFullScreen
									? 'Close Dependecies'
									: 'Open Dependecies'}
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
					</React.Fragment>
				) : (
					''
				)}
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
		);
	} else {
		return null;
	}
};
