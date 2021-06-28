import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Footer.css";

export default class Footer extends Component {
	render() {
		return (
			<footer
				id="footer"
				className="text-center bg-agi-green text-light mt-auto py-5"
			>
				<Container>
					<Row>
						<Col>
							Built by Canada Solutions on{" "}
							<span className="salesforcedisclaimer"></span>
							<Row className="mt-3">
								<Col lg={12}
									className="mb-3">
									Questions? Contact:
								</Col>
								<Col
								    md={{
										span: 3,
										offset: 3
									}}
									className="mb-2">
									<span className="agi-header-normal">Tom Johnston</span><br></br>
									Strategic Account Director<br></br>
									<a href="mailto:tjohnston@salesforce.com">tjohnston@salesforce.com</a><br></br>
									<a href="tel:6472863306">(647) 286 3306</a>
								</Col>
								<Col
									md={{
									span: 3
									}}
								className="mb-2">
								<span className="agi-header-normal">Ryan Sydor</span><br></br>
									Vice President, Manufacturing<br></br>
									<a href="mailto:ryan.sydor@salesforce.com">ryan.sydor@salesforce.com</a><br></br>
									<a href="tel:6474642847">(647) 464 2847</a>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</footer>
		);
	}
}