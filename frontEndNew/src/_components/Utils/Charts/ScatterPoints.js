import React from 'react';
import { Group } from '@vx/group';
import { Circle } from '@vx/shape';
import { GradientPinkRed } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';
import { genRandomNormalPoints } from '@vx/mock-data';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { AxisLeft, AxisBottom } from '@vx/axis';

const points = genRandomNormalPoints(600).filter((d, i) => {
	return i < 600;
});

const x = d => d[0];
const y = d => d[1];
const z = d => d[2];

let tooltipTimeout;

// export const ScatterPoints = () => {
// xMax, xMin, yMax, yMin
const ScatterPoints = props => {
	const {
		width,
		height,
		dataPoints,
		xMaxPos,
		yMaxPos,
		xMinPos,
		yMinPos,
		title,
	} = props;
	const xMax = width - 10;
	const yMax = height - 10;

	const xScale = scaleLinear({
		domain: [xMinPos, xMaxPos],
		range: [5, xMax],
		clamp: true,
	});
	const yScale = scaleLinear({
		domain: [yMinPos, yMaxPos],
		range: [5, yMax],
		clamp: true,
	});

	return (
		<div>
			<div>{title}</div>
			<svg width={width} height={height}>
				<rect
					width={width}
					height={height}
					fill={'url(#white)'}
					stroke={'black'}
					strokeWidth={2}
				/>

				<Group
					onTouchStart={event => {
						if (tooltipTimeout) clearTimeout(tooltipTimeout);
						props.hideTooltip();
					}}>
					{dataPoints.map((point, i) => {
						const cx = xScale(x(point));
						const cy = yScale(y(point));
						const r = 2.765;
						return (
							<Circle
								key={`point-${point.x}-${i}`}
								className='dot'
								cx={cx}
								cy={cy}
								r={r}
								fill='#f6c431'
								onMouseEnter={event => {
									if (tooltipTimeout) clearTimeout(tooltipTimeout);
									props.showTooltip({
										tooltipLeft: cx,
										tooltipTop: cy + 20,
										tooltipData: point,
									});
								}}
								onMouseLeave={event => {
									tooltipTimeout = setTimeout(() => {
										props.hideTooltip();
									}, 300);
								}}
								onTouchStart={event => {
									if (tooltipTimeout) clearTimeout(tooltipTimeout);
									props.showTooltip({
										tooltipLeft: cx,
										tooltipTop: cy - 30,
										tooltipData: point,
									});
								}}
							/>
						);
					})}
					<AxisBottom scale={xScale} stroke={'black'} tickStroke={'black'} />
					<AxisLeft scale={yScale} stroke={'black'} tickStroke={'black'} />
				</Group>
			</svg>
			{props.tooltipOpen && (
				<Tooltip left={props.tooltipLeft} top={props.tooltipTop}>
					<div>
						<strong>x:</strong> {x(props.tooltipData)}
					</div>
					<div>
						<strong>y:</strong> {y(props.tooltipData)}
					</div>
				</Tooltip>
			)}
		</div>
	);
};

export default withTooltip(ScatterPoints);
