import React, { Component } from "react";
import { Button } from '@salesforce/design-system-react';

import { Card, Image, Form, InputGroup, Toast } from "react-bootstrap";

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login_errors: "",
			showed: false,
			toastTitle: ""
		};
	}

	setToastClose = () => { this.setState({ showed : false }); }

	loginUser = async (e) => {
		if (this.props.login_username.indexOf("@salesforce.com", this.props.login_username.length - "@salesforce.com".length) !== -1) {
			await this.props.sendRequest(this.props.login_username, this.props.login_password);
		} else if (this.props.login_username.indexOf("@aircanada.ca", this.props.login_username.length - "@aircanada.ca".length) !== -1) {
			await this.props.sendRequest(this.props.login_username, this.props.login_password);
		} else {
			this.setState({ login_errors: "Invalid Email Domain. Please make sure you are using a Salesforce email or valid customer domain.", toastTitle: "Error", showed : true});
		}
	}

	render() {
		return (
			<div>
				<div style={{ position: 'absolute', zIndex: 1, top: -30, right: -20 }} >
					<Toast onClose={this.setToastClose} show={this.state.showed} delay={15000} autohide>
						<Toast.Header>
							<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
							<strong className="mr-auto">{this.state.toastTitle}</strong>
						</Toast.Header>
						<Toast.Body>{this.state.login_errors}</Toast.Body>
					</Toast>
				</div>
				<Card id="login" className="mx-auto mt-5">
					<Card.Body className="text-center">
						<Image
							alt="Co-branded Logo"
							src="assets/images/agi-salesforce.svg"
							id="logo"
							className="img-fluid mx-auto d-block"
							loading="lazy"
							style={{ 
								'maxWidth' : '80%',
								'padding' : '0'
						 		}}
						></Image>

						<Card.Title className="text-muted my-4">Log In to continue</Card.Title>

						<Form>
							<Form.Group controlId="loginUsername">
								<Form.Label srOnly>Email address</Form.Label>
								<InputGroup className="input-group-lg mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="fal fa-envelope"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="email"
										name="login_username"
										className="text-left"
										placeholder="Your Email"
										autoComplete="false"
										value={this.props.login_username}
										onChange={this.props.handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId="loginPassword">
								<Form.Label srOnly>Password</Form.Label>
								<InputGroup className="input-group-lg mb-4">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="fal fa-lock-alt"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="password"
										name="login_password"
										className="text-left"
										placeholder="Password"
										autoComplete="false"
										value={this.props.login_password}
										onChange={this.props.handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
						</Form>
						<Button 
							variant="brand" 
							label="Log In" 
							onClick={this.loginUser}
							style={{ 'color': '#ffffff', 'fontSize': '1.25rem', 'borderRadius': '4rem', 'paddingTop': "10px"}}
							className="btn btn-primary btn-block"
						/>
					</Card.Body>
				</Card>
			</div>
		);
	}
}