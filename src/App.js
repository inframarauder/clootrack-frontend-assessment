import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import getApiData from "./utils/getApiData";
import "./App.css";

const App = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const apiData = await getApiData();
				setData(apiData);
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
			<div className="App">
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
			</div>

			<Footer />
		</>
	);
};

export default App;
