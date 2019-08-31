import React from 'react';
import GridLayout from 'react-grid-layout';
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
		name: '1',
		prediction: 4000,
		real: 2400,
		amt: 2400,
	},
	{
		name: '5',
		prediction: 3000,
		real: 1398,
		amt: 2210,
	},
	{
		name: '10',
		prediction: 2000,
		real: 9800,
		amt: 2290,
	},
	{
		name: '15',
		prediction: 2780,
		real: 3908,
		amt: 2000,
	},
	{
		name: '20',
		prediction: 1890,
		real: 4800,
		amt: 2181,
	},
	{
		name: '25',
		prediction: 2390,
		real: 3800,
		amt: 2500,
	},
	{
		name: '30',
		prediction: 3490,
		real: 4300,
		amt: 2100,
	},
];

export default function DashboardChart() {
	return (
		<React.Fragment>
			<Title>Month</Title>
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
						type='monotone'
						dataKey='real'
						stroke='#8884d8'
						activeDot={{ r: 8 }}
					/>
					<Line type='monotone' dataKey='prediction' stroke='#82ca9d' />
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
