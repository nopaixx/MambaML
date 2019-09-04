import React, { useState } from 'react';
// import * as d3 from 'd3';
import { ColumnSelector } from '../Utils/ColumnSelector';

export const CanvasScatter = ({ portDataPreview }) => {
	const height = 700;
	const width = 1260;
	const numPoints = 10000;
	let timer, startTime;

	const [loading, setLoading] = useState(true);

	const showTimeSince = startTime => {
		const currentTime = new Date().getTime();
		const runtime = currentTime - startTime;
		document.getElementById('timeRendering').innerHTML = runtime + 'ms';
	};

	const startTimer = () => {
		stopTimer();

		startTime = new Date().getTime();

		timer = setInterval(function() {
			showTimeSince(startTime);
		}, 10);

		showTimeSince(startTime);
	};

	const stopTimer = () => {
		if (timer) {
			clearInterval(timer);
		}

		showTimeSince(startTime);
	};

	// useEffect(() => {
	// 	renderChart();
	// }, []);

	const generateData = numPoints => {
		const data = [];
		for (let i = 0; i < numPoints; i++) {
			data.push({
				x: Math.random(),
				y: Math.random(),
			});
		}
		return data;
	};
	const paintCanvas = (canvas, data) => {
		// get the canvas drawing context
		const context = canvas.getContext('2d');

		// clear the canvas from previous drawing
		context.clearRect(0, 0, canvas.width, canvas.height);

		// draw a circle for each datum
		data.forEach(d => {
			// start a new path for drawing
			context.beginPath();

			// paint an arc based on the datum
			const x = d[0] * canvas.width;
			const y = d[1] * canvas.height;
			// const x = d.x * canvas.width;
			// const y = d.y * canvas.height;
			context.arc(x, y, 2, 0, 2 * Math.PI);

			// fill the point
			context.fill();
		});
	};
	const renderChart = data => {
		// Get the amount of data to generate

		if (isNaN(numPoints)) {
			return;
		}
		// const data = generateData(numPoints);

		// Make a container div for our graph elements to position themselves against

		// Make a canvas for the points
		const canvas = document.getElementById('contextCanvas');

		startTimer();
		setLoading(true);
		paintCanvas(canvas, data);
		setLoading(false);
		stopTimer();
	};
	const handleSelectedColumns = (selectedCols, data) => {
		renderChart(data.dataPoints);
		// this.clearCanvas();
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<ColumnSelector
				portDataPreview={portDataPreview}
				maxNumberCols={2}
				selectedColsCB={handleSelectedColumns}
			/>
			<div>
				Number of Points:{' '}
				<span style={{ backgroundColor: 'red', color: 'white' }}>
					{numPoints}
				</span>
				Time Rendering:
				<span
					style={{ backgroundColor: 'red', color: 'white' }}
					id='timeRendering'
				/>
			</div>
			{loading ? <div>Loading...</div> : null}
			<div>
				<canvas id='contextCanvas' width={width} height={height} />
			</div>
		</div>
	);
};
