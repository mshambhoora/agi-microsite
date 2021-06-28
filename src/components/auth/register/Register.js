import React, { Component } from "react";

import { Button } from '@salesforce/design-system-react';
import { Form, InputGroup, Toast, Card, Image } from "react-bootstrap";

export default class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			register_errors: "",
			showed: false,
			toastTitle: ""
		};
	}

	setToastClose = () => { this.setState({ showed : false }); }

	registerUser = async (e) => {
		const passRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,30}$/;

		if (this.props.register_password !== this.props.register_password_confirm) {
			this.setState({register_errors: "Passwords must be the same.", toastTitle: "Error", showed : true});			
  		} else if (!passRegex.test(this.props.register_password)){
			this.setState({register_errors: "Password must be 8 to 30 characters long. Must contain uppercase, lowercase, a digit, and special character.", toastTitle: "Error", showed : true});				
		} else {
			if (this.props.register_username.indexOf("@salesforce.com", this.props.register_username.length - "@salesforce.com".length) !== -1) {
				await this.props.sendRequest(this.props.register_username, this.props.register_password, this.props.register_password_confirm);
			} else if (this.props.register_username.indexOf("@aircanada.ca", this.props.register_username.length - "@aircanada.ca".length) !== -1) {
				await this.props.sendRequest(this.props.register_username, this.props.register_password, this.props.register_password_confirm);
			} else {
				this.setState({register_errors: "Invalid Email Domain. Please make sure you are using a Salesforce email or valid customer domain.", toastTitle: "Error", showed : true});
			}
		}
	}

	render() {
		return (
			<div className="">
        		<div style={{ position: 'absolute', zIndex: 1, top: 0, right: -20 }} >
					<Toast onClose={this.setToastClose} show={this.state.showed} delay={20000} autohide>
						<Toast.Header>
							<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
							<strong className="mr-auto">{this.state.toastTitle}</strong>
						</Toast.Header>
						<Toast.Body>{this.state.register_errors}</Toast.Body>
					</Toast>
				</div>
				<Card id="register" className="mx-auto mt-5">
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
						<Card.Title className="text-muted my-4">Create your account to continue</Card.Title>
						<Form>
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
										name="register_username"
										className="text-left"
										placeholder="Your Email"
										value={this.props.register_username}
										onChange={this.props.handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>

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
										name="register_password"
										className="text-left"
										placeholder="Password"
										value={this.props.register_password}
										onChange={this.props.handleChange}
										required
									/>
								</InputGroup>
							</Form.Group>

							<Form.Group controlId="registerConfirmPassword">
									<Form.Label srOnly>Confirm Password</Form.Label>
									<InputGroup className="input-group-lg mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text>
												<i className="fal fa-lock-alt"></i>
											</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											type="password"
											name="register_password_confirm"
											className="text-left"
											placeholder="Password"
											value={this.props.register_password_confirm}
											onChange={this.props.handleChange}
											required
										/>
									</InputGroup>
								</Form.Group>
						</Form>
						<Button 
							variant="brand" 
							label="Register" 
							onClick={this.registerUser}
							style={{ 'color': '#ffffff', 'fontSize': '1.25rem', 'borderRadius': '4rem', 'paddingTop': "10px"}}
							className="btn btn-primary btn-block"
						/>
					</Card.Body>
				</Card>
			</div>
		);
	}
}