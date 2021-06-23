import React, { Component } from "react";
import { Button } from '@salesforce/design-system-react';
import { Card, Image, Form, InputGroup, Toast } from "react-bootstrap";

export default class ForgotPasswordForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reset_errors: "",
			showed: false,
			toastTitle: ""
		};
	}

	setToastClose = () => { this.setState({ showed : false }); }

	resetPassword = async (e) => {
		const passRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,30}$/;

		if (this.props.reset_password !== this.props.confirm_reset_password) {
			this.setState({reset_errors: "Passwords must be the same.", toastTitle: "Error", validated: false, showed : true});
  		} else if (!passRegex.test(this.props.reset_password)){
			this.setState({reset_errors: "Password must be 8 to 30 characters long. Must contain uppercase, lowercase, a digit, and special character.", toastTitle: "Error", validated: false, showed : true});
		} else {
			if (this.props.reset_username.indexOf("@salesforce.com", this.props.reset_username.length - "@salesforce.com".length) !== -1) {
				await this.props.sendRequest(this.props.reset_username, this.props.reset_password, this.props.confirm_reset_password);
			} else if (this.props.reset_username.indexOf("@aircanada.ca", this.props.reset_username.length - "@aircanada.ca".length) !== -1) {
				await this.props.sendRequest(this.props.reset_username, this.props.reset_password, this.props.confirm_reset_password);
			} else {
				this.setState({reset_errors: "Invalid Email Domain. Please make sure you are using a Salesforce email or valid customer domain.", toastTitle: "Error", showed : true});
			}
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
						<Toast.Body>{this.state.reset_errors}</Toast.Body>
					</Toast>
				</div>
				<Card id="register" className="mx-auto mt-5">
					<Card.Body className="text-center">
						<Image
							alt="Co-branded Logo"
							src="assets/images/combo-logo.png"
							id="logo"
							className="img-fluid mx-auto d-block"
							loading="lazy"
							style={{ 
								'maxWidth' : '100%',
								'padding' : '0'
						 		}}
						></Image>
						<Card.Title className="text-muted my-4">
							Create your login to continue
						</Card.Title>
						<Form>
							{/* EMAIL / USERNAME */}
							<Form.Group controlId="registerUsername">
								<Form.Label srOnly>Email address</Form.Label>
								<InputGroup className="input-group-lg mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="fal fa-envelope"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="email"
										name="reset_username"
										className="text-left"
										placeholder="Your Email"
										value={this.props.reset_username}
										onChange={this.props.handleChange}
										required
									/>
									<Form.Control.Feedback type="invalid">
										Invalid Email
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							{/* PASSWORD */}
							<Form.Group controlId="registerPassword">
								<Form.Label srOnly>Password</Form.Label>
								<InputGroup className="input-group-lg mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="fal fa-lock-alt"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="password"
										name="reset_password"
										className="text-left"
										placeholder="New Password"
										value={this.props.reset_password}
										onChange={this.props.handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>

							{/* NEW PASSWORD */}
							<Form.Group controlId="newPassword1">
								<Form.Label srOnly>New Password</Form.Label>
								<InputGroup className="input-group-lg mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="fal fa-lock-alt"></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="password"
										name="confirm_reset_password"
										className="text-left"
										placeholder="Confirm Password"
										value={this.props.confirm_reset_password}
										onChange={this.props.handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>
						</Form>
						<Button 
							variant="brand" 
							label="Reset Password" 
							onClick={this.resetPassword}
							style={{ 'color': '#ffffff', 'fontSize': '1.25rem', 'borderRadius': '4rem', 'paddingTop': "10px"}}
							className="btn btn-primary btn-block"
						/>
					</Card.Body>
				</Card>
			</div>
		);
	}
}