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
import { D3CanvasScatter } from './Trial/d3canvasScatter';
import { BarChartsCanvas } from './ChartsCanvas/ChartsCanvas';
import Icon from '@material-ui/core/Icon';

import { TableData } from './TableData';

export const DataVisualization = ({ portDataPreview, handleCloseTable }) => {
	const classes = useStyles();
	const [selectedTab, setTab] = useState(0);
	const [SelectedVisualization, setSelectedVisualization] = useState(undefined);

	const GraphVisualization = () => {
		if (SelectedVisualization === 'scatter') {
			return (
				<div>
					<Icon
						onClick={() => setSelectedVisualization(undefined)}
						className={classes.arrowBack}>
						arrow_back
					</Icon>
					<ScatterPointsMatrix portDataPreview={portDataPreview} />
				</div>
			);
		}
		if (SelectedVisualization === 'trial') {
			return (
				<div>
					<Icon
						onClick={() => setSelectedVisualization(undefined)}
						className={classes.arrowBack}>
						arrow_back
					</Icon>
					<D3CanvasScatter portDataPreview={portDataPreview} />
					{/* <CanvasScatter portDataPreview={portDataPreview} /> */}
				</div>
			);
		}
		if (SelectedVisualization === 'bars') {
			return (
				<div>
					<Icon
						onClick={() => setSelectedVisualization(undefined)}
						className={classes.arrowBack}>
						arrow_back
					</Icon>
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
					<Icon
						onClick={() => setSelectedVisualization(undefined)}
						className={classes.arrowBack}>
						arrow_back
					</Icon>
					<HeatmapCanvas />
				</div>
			);
		}
		// if (SelectedVisualization === 'barChartCanvas') {
		// 	return (
		// 		<div>
		// 			<Icon
		// 				onClick={() => setSelectedVisualization(undefined)}
		// 				className={classes.arrowBack}>
		// 				arrow_back
		// 			</Icon>
		// 			<BarChartsCanvas />
		// 		</div>
		// 	);
		// }
		if (SelectedVisualization === 'normalHeatmap') {
			return (
				<div>
					<Icon
						onClick={() => setSelectedVisualization(undefined)}
						className={classes.arrowBack}>
						arrow_back
					</Icon>
					<NormalHeatmap portDataPreview={portDataPreview} />
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
				{/* <div className={classes.visualizationItem}>
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
				</div> */}
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
				{/* <div className={classes.visualizationItem}>
					<div>
						<div>heatmapCanvas</div>
						<div
							id={'heatmapCanvas'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div> */}
				{/* <div className={classes.visualizationItem}>
					<div>
						<div>barChartCanvas</div>
						<div
							id={'barChartCanvas'}
							style={{ width: 200, height: 200 }}
							onClick={e => setSelectedVisualization(e.target.id)}
						/>
					</div>
				</div> */}
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
		<div className={classes.visualizationWrapper}>
			<Icon onClick={handleCloseTable} className={classes.closeIcon}>
				clear
			</Icon>
			<Tabs
				value={selectedTab}
				onChange={(e, tab) => setTab(tab)}
				indicatorColor='primary'
				textColor='primary'
				className={classes.tabs}
				centered>
				<Tab label='Data' />
				<Tab label='Visualizations' />
			</Tabs>
			{selectedTab === 0 ? (
				<TableData portDataPreview={portDataPreview} />
			) : null}
			{selectedTab === 1 ? (
				<div>
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
