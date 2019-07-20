import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ColumnSelectorInput } from './ColumnSelectorInput';
import { ControlPanel } from './ControlPanel';
import { PortSelector } from './PortSelector';

export const ColSelector = ({
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
				let inputsColNotParsed;
				if (results) {
					inputsColNotParsed = JSON.parse(results.out0.columns);
					inputColumns = {
						...inputColumns,
						[portId]: Object.values(inputsColNotParsed['0']),
					};
				}
			}
		}
	}
	if (!inputColumns) return null;
	return (
		<Dialog
			open={isColSelectorOpen}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>{'Column Selector'}</DialogTitle>
			<DialogContent>
				<PortSelector inputColumns={inputColumns} setOption={setPort} />
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
