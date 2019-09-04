import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
	return { time, amount };
}

const data2 = [
	{
		name: '1:00',
		endpoint1: 0,
		endpoint2: 0,
		total: 24000,
	},
	{
		name: '5:00',
		endpoint1: 0,
		endpoint2: 0,
		total: 24000,
	},
	{
		name: '10:00',
		endpoint1: 0,
		endpoint2: 0,
		endpoint3: 2290,
	},
	{
		name: '15:00',
		endpoint1: 2780,
		endpoint2: 3908,
		endpoint3: 0,
	},
	{
		name: '20:00',
		endpoint1: 0,
		endpoint2: 0,
		endpoint3: 500,
	},
	{
		name: '24:00',
		endpoint1: 0,
		endpoint2: 5000,
		endpoint3: 0,
	},
];

export default function EndpointChart() {
	return (
		<React.Fragment>
			<Title>Day</Title>
			<ResponsiveContainer>
				<LineChart
					width={500}
					height={300}
					data={data2}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}>
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						strokeWidth={2}
						type='monotone'
						dataKey='endpoint1'
						stroke='red'
						activeDot={{ r: 8 }}
					/>
					<Line
						strokeWidth={2}
						type='monotone'
						dataKey='endpoint2'
						stroke='#82ca9d'
					/>
					<Line
						strokeWidth={2}
						type='monotone'
						dataKey='endpoint3'
						stroke='blue'
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
