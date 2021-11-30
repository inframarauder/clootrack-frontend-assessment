import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					"https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
				);
				setData(res.data);
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		};
		getData();
	}, []);

	return (
		<>
			<Header />
			{loading ? (
				<div className="text-center my-4 p-4">
					<Spinner animation="border" style={{ color: "#e64918" }} />
				</div>
			) : (
				<Container fluid className="chart-card-container">
					<legend className="text-center my-4">Chart Dashboard</legend>
					<hr />
					<Row>
						{data.map((item, index) => (
							<Col key={index} md={4}>
								<Chart data={item} index={index} />
							</Col>
						))}
					</Row>
				</Container>
			)}
			<Footer />
		</>
	);
};

export default App;
