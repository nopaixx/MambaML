import React, { useState } from 'react';
import { useStyles } from './Styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Button from '@material-ui/core/Button';

import Scatter from '../../../Scatter.png';
import Heatmap from '../../../Heatmap.png';

import { ScatterPointsMatrix } from './Scatter/ScatterPointsMatrix';
import { TableData } from './TableData';

export const DataVisualization = ({ portDataPreview, handleCloseTable }) => {
	const classes = useStyles();
	const [selectedTab, setTab] = useState(0);
	const [SelectedVisualization, setSelectedVisualization] = useState(undefined);

	const GraphVisualization = () => {
		if (SelectedVisualization === 'scatter') {
			return (
				<div>
					<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
					<ScatterPointsMatrix portDataPreview={portDataPreview} />
				</div>
			);
		}
	};

	return (
		<div>
			<Button onClick={handleCloseTable} variant='outlined' color='primary'>
				Close
			</Button>
			<Tabs
				value={selectedTab}
				onChange={(e, tab) => setTab(tab)}
				indicatorColor='primary'
				textColor='primary'
				centered>
				<Tab label='Data' />
				<Tab label='Visualizations' />
			</Tabs>
			{selectedTab === 0 ? (
				<TableData portDataPreview={portDataPreview} />
			) : null}
			{selectedTab === 1 ? (
				<div>
					<div>Types</div>

					{SelectedVisualization ? (
						<GraphVisualization />
					) : (
						<div className={classes.visualizationItem}>
							<div>
								<div>Scatter</div>
								<img
									id={'scatter'}
									alt='Scatter'
									src={Scatter}
									width={'200px'}
									onClick={e => setSelectedVisualization(e.target.id)}
								/>
							</div>
							<div>
								<div>Heatmap</div>
								<img
									id={'heatmap'}
									alt='Heatmap'
									src={Heatmap}
									width={'200px'}
									onClick={e => setSelectedVisualization(e.target.id)}
								/>
							</div>
						</div>
					)}
				</div>
			) : null}
		</div>
	);
};
