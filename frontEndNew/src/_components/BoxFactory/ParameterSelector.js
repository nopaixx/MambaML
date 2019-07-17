import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ParametersTable from '../../_components/Utils/Table/Table2';

import Button from '@material-ui/core/Button';
import Dropdown from '../Utils/Dropdown/Dropdown';
import { DATASETS } from '../../_constants';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	controlPanel: {
		textAlign: 'center',
		padding: 10,
	},
	controlItems: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: 10,
		paddingBottom: 50,
	},
	controlItem: {
		border: '1px solid' + theme.palette.primary.main,
		cursor: 'pointer',
		padding: 10,
		borderRadius: 10,
	},
	gridInputs: {
		display: 'grid',
		gridGap: '10px 10px',
		gridTemplateColumns: 'repeat(4, 1fr)',
		textAlign: 'center',
	},
	selectedItem: {
		padding: 10,
		border: '1px solid' + theme.palette.primary.main,
		backgroundColor: theme.palette.primary.light,
		borderRadius: 10,
		cursor: 'pointer',
	},
	gridItem: {
		padding: 10,
		border: '1px solid' + theme.palette.primary.main,
		borderRadius: 10,
		cursor: 'pointer',
	},
}));

const CsvSelector = ({
	selectedDataset,
	isCsvSelectorActive,
	specialParamSelector,
}) => {
	const [isCsvSelectorOpen, setOpenCsvSelector] = useState(false);
	const [option, setOption] = useState();

	useEffect(() => {
		if (isCsvSelectorActive) {
			setOpenCsvSelector(true);
		}
	}, [isCsvSelectorActive, setOpenCsvSelector]);

	function handleClose() {
		setOpenCsvSelector(false);
	}
	function handleConfirm() {
		selectedDataset(option);
		specialParamSelector('');
		setOpenCsvSelector(false);
	}
	return (
		<Dialog
			open={isCsvSelectorOpen}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>{'Select Cols'}</DialogTitle>
			<DialogContent>
				<Dropdown
					options={DATASETS}
					name={'Data sets'}
					selectedOptions={option => setOption(option)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleConfirm} color='primary' autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const PortSelector = ({ inputPorts = ['port1', 'port2'], setOption }) => {
	return (
		<div style={{ justifyContent: 'center', display: 'flex' }}>
			<Dropdown
				options={inputPorts}
				name={'Input Port'}
				selectedOptions={option => setOption(option)}
			/>
		</div>
	);
};
const ColSelector = ({
	isColSelectorOpen,
	nodeInfo,
	chartInfo,
	setColSelectorStatus,
	specialParamSelector,
	selectedColsInfo,
}) => {
	const [selectedCols, setColSelected] = useState([]);
	const [selectedPort, setPort] = useState('port1');

	useEffect(() => {
		if (isColSelectorOpen) {
			setColSelectorStatus(true);
		}
	}, [isColSelectorOpen, setColSelectorStatus]);

	function handleClose() {
		setColSelectorStatus(false);
	}
	function handleConfirm() {
		setColSelectorStatus(false);
		selectedColsInfo({ port: selectedPort, cols: selectedCols });
		specialParamSelector('');
	}
	let inputColumns;
	for (var key in chartInfo.links) {
		if (chartInfo.links.hasOwnProperty(key)) {
			const link = chartInfo.links[key];
			if (link.to.nodeId === nodeInfo.id) {
				const portId = link.to.portId;
				const fromNode = chartInfo.nodes[chartInfo.links[key].from.nodeId];
				const results = fromNode.properties.payload.result;
				let inputsColNotParsed = JSON.parse(results.out0.columns);
				inputColumns = {
					...inputColumns,
					[portId]: Object.values(inputsColNotParsed['0']),
				};
			}
		}
	}
	return (
		<Dialog
			open={isColSelectorOpen}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>{'Column Selector'}</DialogTitle>
			<DialogContent>
				<PortSelector
					inputPorts={Object.keys(inputColumns)}
					setOption={setPort}
				/>
				<ControlPanel
					setColSelected={setColSelected}
					inputColumns={inputColumns[selectedPort]}
				/>
				<ColumnSelectorInput
					selectedCols={selectedCols}
					setColSelected={setColSelected}
					inputColumns={inputColumns[selectedPort]}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary' autoFocus>
					Cancel
				</Button>
				<Button onClick={handleConfirm} color='primary' autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const ControlPanel = ({ setColSelected, inputColumns }) => {
	const classes = useStyles();
	return (
		<div className={classes.controlItems}>
			<div
				className={classes.controlItem}
				onClick={() => setColSelected(inputColumns)}>
				Select All
			</div>

			<div className={classes.controlItem} onClick={() => setColSelected([])}>
				Exclue All
			</div>
		</div>
	);
};

const ColumnSelectorInput = ({
	inputColumns,
	setColSelected,
	selectedCols,
}) => {
	const classes = useStyles();

	const checkIfColIsSelected = col => {
		if (selectedCols.includes(col)) {
			setColSelected(selectedCols.filter(item => item !== col));
		} else {
			setColSelected([...selectedCols, col]);
		}
	};
	return (
		<div className={classes.gridInputs}>
			{inputColumns.map((col, key) => {
				return (
					<div
						key={key}
						onClick={() => checkIfColIsSelected(col)}
						className={
							selectedCols.includes(col)
								? classes.selectedItem
								: classes.gridItem
						}>
						{col}
					</div>
				);
			})}
		</div>
	);
};

export const ParamsSelector = ({
	selectedDataset,
	setParamsState,
	dataset,
	data,
	nodeInfo,
	chartInfo,
	selectedCols,
	selectedColsInfo,
}) => {
	const [isCsvSelectorActive, setCsvSelected] = useState(false);
	const [isColSelectorOpen, setColSelectorStatus] = useState(false);
	const specialParamSelector = value => {
		if (value === 'csv') setCsvSelected(!isCsvSelectorActive);
		if (value === 'colselector') setColSelectorStatus(!isCsvSelectorActive);
	};
	return (
		<div className={'param-selector-wrapper'}>
			<div className={'table-wrapper'}>
				<CsvSelector
					isCsvSelectorActive={isCsvSelectorActive}
					selectedDataset={selectedDataset}
					specialParamSelector={specialParamSelector}
				/>
				<ColSelector
					isColSelectorOpen={isColSelectorOpen}
					setColSelectorStatus={setColSelectorStatus}
					selectedColsInfo={selectedColsInfo}
					specialParamSelector={specialParamSelector}
					nodeInfo={nodeInfo}
					chartInfo={chartInfo}
				/>
				<ParametersTable
					specialParamSelector={specialParamSelector}
					updateBoxState={setParamsState}
					dataset={dataset}
					selectedCols={selectedCols}
					data={data}
				/>
			</div>
		</div>
	);
};
