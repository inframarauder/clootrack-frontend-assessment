import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
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
import { getRandomColor, renderCustomizedLabel } from "../../utils/chart-utils";
import "./Chart.css";

const Chart = ({ data, index }) => {
	//chart state
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		setChartData(
			data.elements.map((item, index) => ({
				name: `item_${index + 1}`,
				value: item,
			}))
		);
	}, [data.elements]);

	//modal state
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = (index) => setShow(true);

	//edit form change handler
	const handleChange = (e) => {
		const updatedChartData = chartData.map((item) => {
			if (item.name === e.target.name) {
				return {
					...item,
					value: parseInt(e.target.value),
				};
			}
			return item;
		});
		console.log(updatedChartData);
		setChartData(updatedChartData);
	};

	console.log(chartData);

	return (
		<>
			<Card className="chart-card mb-3">
				<p className="card-title">
					<span>
						Char #{index + 1} ({data.type})
					</span>
					<Button size="sm" variant="secondary" onClick={() => handleShow()}>
						<i className="fa fa-pencil mx-2"></i>
						Edit
					</Button>
				</p>

				<ResponsiveContainer width="100%" height={400}>
					{data.type === "Bar" ? (
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="name"
								angle={-10}
								style={{ fontSize: "0.9rem" }}
							/>
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
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Chart #{index + 1}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Set values for the parameters as per your wish...</p>
					<Form>
						{chartData.map((item, index) => (
							<Form.Group key={`form-group-${index}`}>
								<Form.Label>{`item_${index + 1}`}</Form.Label>
								<Form.Control
									type="number"
									placeholder={item.name}
									name={item.name}
									value={item.value}
									onChange={handleChange}
								/>
							</Form.Group>
						))}
						<Button variant="primary" className="my-4" onClick={handleClose}>
							Save
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Chart;
