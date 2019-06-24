import React, { useState, useEffect } from 'react';

import { Input } from '../../Utils/Input/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './BoxInfo.css';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

import { makeStyles } from '@material-ui/core/styles';

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
				{ports.input ? (
					<TextField
						id='input'
						label='Input'
						type='number'
						className={classes.ports}
						name={'input'}
						value={ports.input}
						onChange={handleChange}
						margin='normal'
					/>
				) : null}
				{ports.output ? (
					<TextField
						id='input'
						label='Output'
						type='number'
						name={'output'}
						className={classes.ports}
						value={ports.output}
						onChange={handleChange}
						margin='normal'
					/>
				) : null}

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
				<Button
					onClick={() => boxActions.onDeleteKey()}
					variant='outlined'
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
