import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import scale from 'd3-scale';
import Data from './Data.json';
import { event as currentEvent } from 'd3-selection';
// import {zoom } from 'd3-zoom'
// import {zoom } from 'd3-zoom'

export const HeatmapCanvas = () => {
	const [canvasDim, setCanvasDim] = useState([900, 400]);
	const X = 0,
		Y = 1;
	const myCanvas = useRef('myCanvas');
	const myRec = useRef('myRec');

	useEffect(() => {
		const heatmap = Data['JSON'];

		var canvasAspect = canvasDim[Y] / canvasDim[X];
		var heatmapDim = [heatmap[X].length, heatmap.length];
		var heatmapAspect = heatmapDim[Y] / heatmapDim[X];

		if (heatmapAspect < canvasAspect) {
			setCanvasDim([canvasDim[X], canvasDim[X] * heatmapAspect]);
			canvasDim[Y] = canvasDim[X] * heatmapAspect;
		} else {
			canvasDim[X] = canvasDim[Y] / heatmapAspect;
			setCanvasDim([canvasDim[Y] / heatmapAspect, canvasDim[Y]]);
		}
		var color = d3
			.scaleLinear()
			.domain([95, 115, 135, 155, 175, 195])
			.range(['#0a0', '#6c0', '#ee0', '#eb4', '#eb9', '#fff']);

		var scale = [
			d3
				.scaleLinear()
				.domain([0, heatmapDim[X]])
				.range([0, canvasDim[X]]),
			d3
				.scaleLinear()
				.domain([0, heatmapDim[Y]])
				.range([canvasDim[Y], 0]),
		];

		// console.log(svg);

		// var tip = d3
		// 	.tip()
		// 	.attr('class', 'd3-tip')
		// 	.offset([10, 0])
		// 	.html(function(d) {
		// 		var k = d3.mouse(this);
		// 		var m = Math.floor(scale[X].invert(k[0]));
		// 		var n = Math.floor(scale[Y].invert(k[1]));
		// 		return 'Intensity Count: ' + heatmap[n][m];
		// 	});
		// svg.call(tip);

		var zoom = d3
			.zoom()
			.scaleExtent([1, 10])
			.on('zoom', zoomEvent);

		// // console.log(d3.zoom().scaleExtent([1, 10]));

		d3.select(myRec.current).call(zoom);
		var axis = [d3.axisTop(scale[X]).ticks(20), d3.axisRight(scale[Y])];

		// console.log('axis', axis);

		var axisElement = [
			d3
				.select(myCanvas.current)
				.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + canvasDim[Y] + ')')
				.call(axis[0]),
			d3
				.select(myCanvas.current)
				.append('g')
				.attr('class', 'y axis')
				.call(axis[1]),
		];

		// svg.on('mousemove', tip.show); //Added
		// svg.on('mouseout', tip.hide); //Added

		const canvas = document.getElementById('heatmapCanvas');
		var context = canvas.getContext('2d');
		var imageObj;
		var imageDim;
		var imageScale;
		createImageObj();
		drawAxes();

		// Compute the pixel colors; scaled by CSS.
		function createImageObj() {
			imageObj = new Image();
			const image = context.createImageData(heatmapDim[X], heatmapDim[Y]);
			console.log('image');
			imageObj.onload = () => imageLoaded();

			console.log(imageObj);

			const imageLoaded = () => {
				console.log('image loaded');
				for (var y = 0, p = -1; y < heatmapDim[Y]; ++y) {
					for (var x = 0; x < heatmapDim[X]; ++x) {
						var c = d3.rgb(color(heatmap[y][x]));
						image.data[++p] = c.r;
						image.data[++p] = c.g;
						image.data[++p] = c.b;
						image.data[++p] = 255;
					}
				}
				context.putImageData(image, 0, 0);

				console.log('imageScale', imageScale);
				console.log('imageDim', imageDim);
			};
			for (var y = 0, p = -1; y < heatmapDim[Y]; ++y) {
				for (var x = 0; x < heatmapDim[X]; ++x) {
					var c = d3.rgb(color(heatmap[y][x]));
					image.data[++p] = c.r;
					image.data[++p] = c.g;
					image.data[++p] = c.b;
					image.data[++p] = 255;
				}
			}
			context.putImageData(image, 0, 0);
			imageObj.src = canvas.toDataURL();
			imageDim = [imageObj.width, imageObj.height];
			imageScale = imageDim.map(function(v, i) {
				return v / canvasDim[i];
			});

			// imageObj.src = canvas.toDataURL();
			// imageDim = [imageObj.width, imageObj.height];
			// imageScale = imageDim.map(function(v, i) {
			// 	return v / canvasDim[i];
			// });
			// console.log('imageScale', imageScale);
			// console.log('imageDim', imageDim);
		}

		function drawAxes() {
			if (d3.event) {
				console.log(imageScale[0]);
				console.log(d3.event.transform.rescaleX());
				var new_x_scale = d3.event.transform.rescaleX(imageScale[0]);
				axisElement[0]
					.transition()
					.duration(0)
					.call(axis[0].scale(new_x_scale));
			}
			// axisElement.forEach((v, i) => {
			// 	console.log('v', v);
			// 	console.log(axis[i]);
			// 	v.call(axis[i]);
			// });
		}

		function zoomEvent() {
			var transform = d3.event.transform;
			context.save();
			context.clearRect(0, 0, canvasDim[X], canvasDim[Y]);
			context.translate(transform.x, transform.y);
			context.scale(transform.k, transform.k);
			context.drawImage(imageObj, 0, 0);
			context.restore();

			// var s = d3.event.transform.k;
			// var n = imageDim.map(v => {
			// 	return v * s;
			// });
			// var t = d3.event.translate.map(function(v, i) {
			// 	return Math.min(0, Math.max(v, canvasDim[i] - n[i] / imageScale[i]));
			// });
			// zoom.translate(t);
			// var it = t.map(function(v, i) {
			// 	return v * imageScale[i];
			// });
			// context.clearRect(0, 0, canvasDim[X], canvasDim[Y]);
			// context.drawImage(imageObj, it[X], it[Y], n[X], n[Y]);

			drawAxes();
		}
		context.drawImage(imageObj, 0, 0);
	}, []);
	return (
		<div>
			<canvas
				style={{ position: 'absolute', border: '1px solid black' }}
				id={'heatmapCanvas'}
				width={canvasDim[X]}
				height={canvasDim[Y]}
			/>
			<svg
				id={'myCanvas'}
				style={{ position: 'relative' }}
				width={canvasDim[X]}
				height={canvasDim[Y]}
				ref={myCanvas}>
				<rect
					ref={myRec}
					style={{ pointerEvents: 'all', fill: 'none' }}
					width={canvasDim[X]}
					height={canvasDim[Y]}
				/>
			</svg>
		</div>
	);
};
