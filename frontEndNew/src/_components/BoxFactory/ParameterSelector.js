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

export const ParamsSelector = ({
	selectedDataset,
	setParamsState,
	specialParamSelector,
	isCsvSelectorActive,
	dataset,
}) => {
	const [open, setOpen] = useState(false);
	const [option, setOption] = useState();

	useEffect(() => {
		if (isCsvSelectorActive) {
			setOpen(true);
		}
	}, [isCsvSelectorActive, open]);

	function handleClose() {
		setOpen(false);
	}
	function handleConfirm() {
		selectedDataset(option);
		specialParamSelector('');
		setOpen(false);
	}
	return (
		<div className={'param-selector-wrapper'}>
			<div className={'table-wrapper'}>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>{'Select Data Set'}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							Select the Data set you want to include
						</DialogContentText>
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
				<ParametersTable
					specialParamSelector={specialParamSelector}
					updateBoxState={setParamsState}
					dataset={dataset}
				/>
			</div>
		</div>
	);
};
