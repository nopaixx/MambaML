import React, { useState } from 'react';
import { useStyles } from './Styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Button from '@material-ui/core/Button';

import Scatter from '../../../Scatter.png';
import HeatmapImg from '../../../Heatmap.png';

import { ScatterPointsMatrix } from './Scatter/ScatterPointsMatrix';
import { Heatmap } from './Heatmap/Heatmap';
import PlotBlock from './Trial/Trial';
import NormalHeatmap from './Heatmap/normalHeatmap';
import { HeatmapCanvas } from './Heatmap/heatmapCanvas';
import { CanvasChart } from './Trial/canvasChart';
import { CanvasScatter } from './Trial/canvasScatter';
import { BarChartsCanvas } from './ChartsCanvas/ChartsCanvas';

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
		// if (SelectedVisualization === 'heatmap') {
		// 	return (
		// 		<div>
		// 			<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
		// 			<Heatmap portDataPreview={portDataPreview} />
		// 		</div>
		// 	);
		// }
		if (SelectedVisualization === 'trial') {
			return (
				<div>
					<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
					<CanvasScatter />
				</div>
			);
		}
		if (SelectedVisualization === 'bars') {
			return (
				<div>
					<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
					<CanvasChart
						width={960}
						height={500}
						portDataPreview={portDataPreview}
					/>
				</div>
			);
		}
		if (SelectedVisualization === 'heatmapCanvas') {
			return (
				<div>
					<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
					<HeatmapCanvas />
				</div>
			);
		}
		if (SelectedVisualization === 'barChartCanvas') {
			return (
				<div>
					<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
					<BarChartsCanvas />
				</div>
			);
		}
		if (SelectedVisualization === 'normalHeatmap') {
			return (
				<div>
					<div onClick={() => setSelectedVisualization(undefined)}>Back</div>
					<NormalHeatmap />
				</div>
			);
		}
	};

	const VisualizationTypes = () => {
		return (
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
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
				</div>
				<div className={classes.visualizationItem}>
					<div>
						<div>Heatmap</div>
						<img
							id={'heatmap'}
							alt='Heatmap'
							src={HeatmapImg}
							width={'200px'}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div>
				<div className={classes.visualizationItem}>
					<div>
						<div>trial</div>
						<div
							id={'trial'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div>
				<div className={classes.visualizationItem}>
					<div>
						<div>bars</div>
						<div
							id={'bars'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div>
				<div className={classes.visualizationItem}>
					<div>
						<div>heatmapCanvas</div>
						<div
							id={'heatmapCanvas'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div>
				<div className={classes.visualizationItem}>
					<div>
						<div>barChartCanvas</div>
						<div
							id={'barChartCanvas'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div>
				<div className={classes.visualizationItem}>
					<div>
						<div>normalHeatmap</div>
						<div
							id={'normalHeatmap'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div>
			</div>
		);
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
						<VisualizationTypes />
					)}
				</div>
			) : null}
		</div>
	);
};
