import React from "react";
import { Navbar } from "react-bootstrap";
import "./Header.css";

const Header = () => {
	return (
		<Navbar className="navbar" variant="dark">
			<Navbar.Brand href="/" className="mx-4 p-2">
				Clootrack Data Visualization
			</Navbar.Brand>
		</Navbar>
	);
};

export default Header;
