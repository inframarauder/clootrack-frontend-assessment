import React, { useEffect } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Chart from "../Chart/Chart";
import { setChartData } from "../../redux/actions/data.actions";

import "./Main.css";

const Main = ({ data, setChartData }) => {
	useEffect(() => {
		setChartData();
	}, [setChartData]);

	return (
		<div className="main">
			{data.loading ? (
				<div className="text-center my-4 p-4">
					<Spinner animation="border" style={{ color: "#e64918" }} />
				</div>
			) : (
				<Container fluid className="chart-card-container">
					<legend className="text-center my-4">Chart Dashboard</legend>
					<hr />
					<Row>
						{data.chartData.map((item, index) => (
							<Col key={index} md={4}>
								<Chart chartData={item} index={index} />
							</Col>
						))}
					</Row>
				</Container>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
	setChartData: () => dispatch(setChartData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
