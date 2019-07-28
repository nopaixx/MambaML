import React, { useEffect } from 'react';

export const BarChartsCanvas = () => {
	useEffect(() => {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		var cw = canvas.width;
		var ch = canvas.height;
		function drawBars() {
			ctx.textAlign = 'center';
			ctx.textBaseline = 'bottom';
			ctx.font = '14px verdana';
			ctx.fillStyle = 'white';

			ctx.fillRect(0, 0, cw, ch);
			const bars = generateBars();
			for (var i = 0; i < bars.length; i++) {
				var bar = bars[i];
				ctx.fillStyle = bar.color;
				ctx.fillRect(bar.x, bar.y - 20, bar.width, -bar.height);
				ctx.fill();
				ctx.strokeStyle = 'lightgray';
				ctx.strokeRect(bar.x, bar.y - 20, bar.width, -bar.height);
				ctx.fillStyle = 'black';
				ctx.fillText(bar.height, bar.x + bar.width / 2, ch - 3);
			}
		}
		const generateBars = () => {
			let position = 5;
			let bars = [];
			for (let i = 0; i < 10000; i++) {
				bars.push({
					x: position + 5,
					y: ch,
					width: 5,
					height: 125,
					color: i % 2 ? 'green' : 'blue',
				});
				position = position + 5;
			}
			return bars;
		};
		drawBars();
	}, []);

	return (
		<div>
			<canvas id='canvas' width={10000} height={300} />
		</div>
	);
};
