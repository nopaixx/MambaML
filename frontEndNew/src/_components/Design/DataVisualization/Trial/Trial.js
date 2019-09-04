import React from 'react';
import * as d3 from 'd3';
// import scale from 'd3-scale';
import ReactDOM from 'react-dom';

class Axis extends React.Component {
	componentDidUpdate() {
		this.renderAxis();
	}

	componentDidMount() {
		this.renderAxis();
	}

	renderAxis() {
		const node = ReactDOM.findDOMNode(this);
		d3.select(node).call(this.props.axis);
	}

	render() {
		const translate = 'translate(0,' + this.props.h + ')';

		return (
			<g
				className='axis'
				transform={this.props.axisType === 'x' ? translate : ''}
			/>
		);
	}
}

class Points extends React.Component {
	render() {
		const _self = this;
		const circles = _self.props.data.map((d, i) => {
			return (
				<circle
					className='dot'
					r='3.5'
					cx={_self.props.x(d)}
					cy={_self.props.y(d)}
					key={i}
					fill='red'
				/>
			);
		});
		return <g>{circles}</g>;
	}
}

const generateRandomData = () => {
	let inputData = [];
	let xAxis = 'A' + 0;
	for (let i = 0; i < 1000; i++) {
		var randomNumber = Math.floor(Math.random() * 201);
		if (i % 100) xAxis = 'A' + i;
		inputData.push({ x: xAxis + i, y: randomNumber });
	}
	return inputData;
};

export default class PlotBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			csvData: [],
		};
	}

	componentDidMount() {
		const inputData = generateRandomData();

		this.setState({ csvData: inputData });
	}

	render() {
		const margin = { top: 20, right: 20, bottom: 30, left: 50 };
		const width = 720 - margin.left - margin.right;
		const height = 200 - margin.top - margin.bottom;

		const svg = d3
			.select('body')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom + 200)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		const x = d => d['x'];

		const xMap = d => {
			return xScale(x(d));
		};
		const xScale = d3
			.scalePoint()
			.domain(this.state.csvData.map(d => d['x']))
			.range([0, width]);

		const xAxis = d3.axisBottom(xScale);

		const y = d => d['y'];

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(this.state.csvData, y)])
			.range([height, 0]);

		const yMap = d => {
			return yScale(y(d));
		};

		const yAxis = d3.axisLeft(yScale);

		const svgContainerWidth = width + margin.left + margin.right;
		const svgContainerHeight = height + margin.top + margin.bottom + 200;
		const innerContainer = 'translate(' + margin.left + ',' + margin.top + ')';

		if (this.state.csvData) {
			return (
				<div className='plot-block'>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
					<svg width={svgContainerWidth} height={svgContainerHeight}>
						<g transform={innerContainer}>
							<Axis h={height} axis={xAxis} axisType='x' />
							<Axis h={height} axis={yAxis} axisType='y' />
							<Points data={this.state.csvData} x={xMap} y={yMap} />
						</g>
					</svg>
				</div>
			);
		}
		return null;
	}
}
