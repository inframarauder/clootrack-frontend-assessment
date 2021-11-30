import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<p className="text-center">
				Made with ❤️ by{" "}
				<a
					href="https://subhasis.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					className="footer-link"
				>
					Subhasis Das
				</a>{" "}
			</p>
			<p className="text-center">
				<a
					href="https://github.com/subhasis020299/clootrack-frontend-assessment"
					target="_blank"
					rel="noopener noreferrer"
					className="footer-link"
				>
					View on Github
				</a>
			</p>
		</footer>
	);
};

export default Footer;
