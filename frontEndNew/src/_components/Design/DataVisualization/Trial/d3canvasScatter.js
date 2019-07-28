import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { ColumnSelector } from '../Utils/ColumnSelector';

export const D3CanvasScatter = ({ portDataPreview }) => {
	var margin = { top: 20, right: 10, bottom: 30, left: 40 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	const createChart = points => {
		var svg = d3
			.select('#mySvg')
			.append('g')
			.attr('transform', 'translate(' + margin.left + ' ' + 0 + ')');

		var factory = d3.quadtree().extent([[0, 0], [width, height]]);

		var x = d3.scaleLinear().range([0, width]);

		var y = d3.scaleLinear().range([height, 0]);

		var xAxis = d3.axisBottom(x);
		// // .orient('bottom');

		var yAxis = d3.axisLeft(y);
		// .orient('left');

		var xg = svg
			.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')');

		var yg = svg.append('g').attr('class', 'y axis');

		const canvas = document.getElementById('canvas');

		var context = canvas.getContext('2d');

		context.fillStyle = '#f0f';

		// Layer on top of canvas, example of selection details
		const chartArea = d3.select('#body');

		var highlight = chartArea
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('circle')
			.attr('r', 7)
			.classed('hidden', true);

		redraw(x, y, xAxis, yAxis, factory, xg, yg, highlight, points);
	};
	const redraw = (x, y, xAxis, yAxis, factory, xg, yg, highlight, points) => {
		// Randomize the scale
		const canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var scale = 1 + Math.floor(Math.random() * 10);

		// Redraw axes
		x.domain(points.map(d => d[0]));
		y.domain([0, d3.max(points, d => d[1])]);
		xg.call(xAxis);
		yg.call(yAxis);

		// var points = randomPoints(scale);
		var tree = factory.addAll(points);

		// Update canvas
		context.clearRect(0, 0, width, height);

		points.forEach(function(p, i) {
			context.beginPath();
			context.arc(x(p[0]), y(p[1]), 5, 0, 2 * Math.PI);
			context.fill();
		});

		d3.select('#canvas').on('mousemove', function() {
			var mouse = d3.mouse(this);
			const closest = tree.find(x.invert(mouse[0]), y.invert(mouse[1]));
			highlight.attr('cx', x(closest[0])).attr('cy', y(closest[1]));
		});
		d3.select('#canvas').on('mouseover', function() {
			highlight.classed('hidden', false);
		});

		d3.select('#canvas').on('mouseout', function() {
			highlight.classed('hidden', true);
		});
	};
	// const clearCanvas = () => {
	// 	let canvas = this.canvas;
	// 	let context = canvas.getContext('2d');
	// 	let margin = { top: 20, right: 20, bottom: 30, left: 40 };
	// 	context.translate(-margin.left, -margin.top);
	// };
	const handleSelectedColumns = (selectedCols, data) => {
		console.log(data.dataPoints);
		createChart(data.dataPoints);
		// clearCanvas();
	};
	return (
		<React.Fragment>
			<div style={{ marginBottom: 20 }}>
				<ColumnSelector
					portDataPreview={portDataPreview}
					maxNumberCols={2}
					selectedColsCB={handleSelectedColumns}
				/>
			</div>
			<div
				style={{
					width: 960,
					height: 500,
					margin: 'auto',
					position: 'relative',
				}}>
				<svg
					id={'mySvg'}
					width={960}
					height={500}
					style={{ left: -40, position: 'relative' }}
				/>
				<div
					id={'body'}
					width={960}
					height={500}
					style={{ position: 'absolute', top: 0 }}>
					<canvas
						style={{ position: 'absolute' }}
						id='canvas'
						width={width}
						height={height}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
