import React, { useState } from "react";
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
import { connect } from "react-redux";
import { getRandomColor, renderCustomizedLabel } from "../../utils/chart-utils";
import { updateChartData } from "../../redux/actions/data.actions";
import "./Chart.css";

const Chart = ({ chartData, index, updateChartData }) => {
	//modal state
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//edit form change handler
	const handleChange = (e) => {
		const update = {
			chartIndex: index,
			name: e.target.name,
			value: parseInt(e.target.value),
		};

		updateChartData(update);
	};

	return (
		<>
			<Card className="chart-card mb-3">
				<p className="card-title">
					<span>
						Char #{index + 1} ({chartData.type})
					</span>
					<Button size="sm" variant="secondary" onClick={() => handleShow()}>
						<i className="fa fa-pencil mx-2"></i>
						Edit
					</Button>
				</p>

				<ResponsiveContainer width="100%" height={400}>
					{chartData.type === "Bar" ? (
						<BarChart data={chartData.elements}>
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
								data={chartData.elements}
								cx="50%"
								cy="50%"
								outerRadius={150}
								labelLine={false}
								label={renderCustomizedLabel}
								fill={getRandomColor()}
							>
								{chartData.elements.map((entry) => (
									<Cell key={`cell-${entry.name}`} fill={getRandomColor()} />
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
						{chartData.elements.map((item, index) => (
							<Form.Group key={`form-group-${index}`}>
								<Form.Label>{`item_${index + 1}`}</Form.Label>
								<Form.Control
									type="number"
									placeholder={item.name}
									name={item.name}
									value={item.value}
									onChange={(e) => handleChange(e)}
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

const mapDispatchToProps = (dispatch) => ({
	updateChartData: (update) => dispatch(updateChartData(update)),
});

export default connect(null, mapDispatchToProps)(Chart);
