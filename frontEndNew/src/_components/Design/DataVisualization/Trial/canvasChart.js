import React from 'react';
import * as d3 from 'd3';

const generateRandomData = () => {
	let inputData = [];
	let xAxis = 'A' + 0;
	for (let i = 0; i < 500; i++) {
		var randomNumber = Math.random();
		// if (i % 100) xAxis = 'A' + i;
		xAxis = i;
		inputData.push({ x: xAxis, y: randomNumber });
	}
	return inputData;
};

export class CanvasChart extends React.Component {
	componentDidMount() {
		let data = generateRandomData();
		let canvas = this.canvas;
		let context = canvas.getContext('2d');

		let margin = { top: 20, right: 20, bottom: 30, left: 40 },
			width = canvas.width - margin.left - margin.right,
			height = canvas.height - margin.top - margin.bottom;
		console.log(width, height);

		let x = d3
			.scaleBand()
			.rangeRound([0, width])
			.padding(0.1);

		let y = d3.scaleLinear().rangeRound([height, 0]);

		context.translate(margin.left, margin.top);

		x.domain(data.map(d => d.x));
		y.domain([0, d3.max(data, d => d.y)]);

		let yTickCount = 10,
			yTicks = y.ticks(yTickCount),
			yTickFormat = y.tickFormat(yTickCount);

		context.beginPath();
		x.domain().forEach(d => {
			context.moveTo(x(d) + x.bandwidth() / 2, height);
			context.lineTo(x(d) + x.bandwidth() / 2, height + 6);
		});
		context.strokeStyle = 'black';
		context.stroke();

		context.textAlign = 'center';
		context.textBaseline = 'top';
		x.domain().forEach(d => {
			context.fillText(d, x(d) + x.bandwidth() / 2, height + 6);
		});

		context.beginPath();
		yTicks.forEach(d => {
			context.moveTo(0, y(d) + 0.5);
			context.lineTo(-6, y(d) + 0.5);
		});
		context.strokeStyle = 'black';
		context.stroke();

		context.textAlign = 'right';
		context.textBaseline = 'middle';
		yTicks.forEach(d => {
			context.fillText(yTickFormat(d), -9, y(d));
		});

		context.beginPath();
		context.moveTo(-6.5, 0 + 0.5);
		context.lineTo(0.5, 0 + 0.5);
		context.lineTo(0.5, height + 0.5);
		context.lineTo(-6.5, height + 0.5);
		context.strokeStyle = 'black';
		context.stroke();

		context.save();
		context.rotate(-Math.PI / 2);
		context.textAlign = 'right';
		context.textBaseline = 'top';
		context.font = 'bold 10px sans-serif';
		context.fillText('y', -10, 10);
		context.restore();

		context.fillStyle = 'steelblue';
		data.forEach(d => {
			context.fillRect(x(d.x), y(d.y), x.bandwidth(), height - y(d.y));
		});
	}

	render() {
		return (
			<canvas
				width={this.props.width}
				height={this.props.height}
				ref={el => {
					this.canvas = el;
				}}
			/>
		);
	}
}

let dataSet = [
	{ letter: 'A', frequency: 0.08167 },
	{ letter: 'B', frequency: 0.01492 },
	{ letter: 'C', frequency: 0.02782 },
	{ letter: 'D', frequency: 0.04253 },
	{ letter: 'E', frequency: 0.12702 },
	{ letter: 'F', frequency: 0.02288 },
	{ letter: 'G', frequency: 0.02015 },
	{ letter: 'H', frequency: 0.06094 },
	{ letter: 'I', frequency: 0.06966 },
	{ letter: 'J', frequency: 0.00153 },
	{ letter: 'K', frequency: 0.00772 },
	{ letter: 'L', frequency: 0.04025 },
	{ letter: 'M', frequency: 0.02406 },
	{ letter: 'N', frequency: 0.06749 },
	{ letter: 'O', frequency: 0.07507 },
	{ letter: 'P', frequency: 0.01929 },
	{ letter: 'Q', frequency: 0.00095 },
	{ letter: 'R', frequency: 0.05987 },
	{ letter: 'S', frequency: 0.06327 },
	{ letter: 'T', frequency: 0.09056 },
	{ letter: 'U', frequency: 0.02758 },
	{ letter: 'V', frequency: 0.00978 },
	{ letter: 'W', frequency: 0.0236 },
	{ letter: 'X', frequency: 0.0015 },
	{ letter: 'Y', frequency: 0.01974 },
	{ letter: 'Z', frequency: 0.00074 },
];
