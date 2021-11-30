import React from "react";
import { Card } from "react-bootstrap";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	PieChart,
	Pie,
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

	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	return (
		<Card className="chart-card">
			<Card.Title className="mx-4 my-4 p-1">
				Char #{index + 1} ({data.type})
			</Card.Title>

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
							fill={getRandomColor()}
							label
						/>
						<Tooltip />
					</PieChart>
				)}
			</ResponsiveContainer>
		</Card>
	);
};

export default Chart;
