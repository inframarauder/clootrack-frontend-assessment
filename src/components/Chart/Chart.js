import React from "react";
import { Card, Button } from "react-bootstrap";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	CartesianGrid,
	XAxis,
	YAxis,
} from "recharts";

import "./Chart.css";

const Chart = ({ data, index }) => {
	const chartData = data.elements.map((item, index) => {
		return { value: item, name: `item_${index}` };
	});

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	return (
		<Card className="chart-card mb-3">
			<p className="card-title">
				<span>
					Char #{index + 1} ({data.type})
				</span>
				<Button size="sm" variant="secondary">
					<i className="fa fa-pencil mx-2"></i>
					Edit
				</Button>
			</p>

			<ResponsiveContainer width="100%" height={400}>
				{data.type === "Bar" ? (
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill={getRandomColor()} />
					</BarChart>
				) : (
					<PieChart>
						<Pie
							dataKey="value"
							isAnimationActive={true}
							data={chartData}
							cx="50%"
							cy="50%"
							outerRadius={150}
							labelLine={false}
							label={renderCustomizedLabel}
							fill={getRandomColor()}
							label
						>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={getRandomColor()} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				)}
			</ResponsiveContainer>
		</Card>
	);
};

export default Chart;
