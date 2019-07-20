import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import Dropdown from '../Dropdown/Dropdown';

import { DATASETS } from '../../../_constants';

export const CsvSelector = ({
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
