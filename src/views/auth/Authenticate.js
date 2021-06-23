import React, { Component } from "react";
import { Container, Row, Col, Button, Toast } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import axios from "axios";
import Cookies from "js-cookie";

import ResetPassword from "../../components/auth/resetPassword/ResetPassword";
import Login from "../../components/auth/login/Login";
import LoginWithCode from "../../components/auth/loginWithCode/LoginWithCode";
import Register from "../../components/auth/register/Register";

import "./Authenticate.css";

export default class Authenticate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login_username: "",
			login_password: "",

			register_username: "",
			register_password: "",
			register_password_confirm: "",

			reset_username: "",
			reset_password: "",
			confirm_reset_password: "",

			login_with_code_username: "",
			login_with_code_code: "",

			isFlipped: false,
			screen: "login",

			showed: false,
			errors: "",
			toastTitle: ""
		};
	}

	componentDidMount = () => { document.addEventListener('keypress', this.enterPressed); }
	componentWillUnmount = () => { document.removeEventListener('keypress', this.enterPressed); }
	handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }
	setToastClose = () => { this.setState({ showed : false }); }
	
	enterPressed = async (e) => {
		if (e.key === "Enter"){
			if(this.state.screen === "login"){
				await this.sendLoginRequest(this.state.login_username, this.state.login_password);
			} else if (this.state.screen === "loginWithCode"){
				this.sendLoginWithCodeRequest(this.state.login_with_code_username, this.state.login_with_code_code);
			} else if (this.state.screen === "reset"){
				await this.sendResetRequest(this.state.reset_username, this.state.reset_password, this.state.confirm_reset_password);
			} else {
				await this.sendRegisterRequest(this.state.register_username, this.state.register_password, this.state.register_password_confirm);
			}
		}
	}

	sendLoginRequest = async (username, password) => {
		await axios.post("https://cx-shield.herokuapp.com/api/user/login",{
				username: username,
				password: password,
				url: window.location.hostname
			})
			.then((response) => {
				Cookies.set("accessToken", response.data.accessToken);

				this.props.history.push("/microsite");
				
				this.setState({
					login_username: "",
					login_password: ""
				});
			})
			.catch((error) => {
				this.setState({ 
					errors: "Invalid Login Credentials.", 
					toastTitle: "Error", 
					showed : true 
				});
			});
	}

	sendLoginWithCodeRequest = async (username, code) => {
		await axios.post("https://cx-shield.herokuapp.com/api/user/login/code",{
				username: username,
				code: code,
				url: window.location.hostname
			})
			.then((response) => {
				Cookies.set("accessToken", response.data.accessToken);

				this.props.history.push("/microsite");
				
				this.setState({
					login_with_code_username: "",
					login_with_code_code: ""
				});
			})
			.catch((error) => {
				this.setState({ 
					errors: "Invalid Access Code.", 
					toastTitle: "Error", 
					showed : true 
				});
			});
	}

	sendRegisterRequest = async (username, password, confirmPassword) => {
		await axios.post("https://cx-shield.herokuapp.com/api/user/create",{
				username: username,
				password: password,
				confirmPassword: confirmPassword,
				returnUrl : window.location.href
			})
			.then((response) => {
				this.setState({ 
					errors: "Account Created! Please check your email, verify your account, and login to the microsite!", 
					toastTitle: "Success", 
					showed : true,
					register_username: "",
					register_password: "",
					register_password_confirm: ""
				});
			})
			.catch((error) => {
				this.setState({ 
					errors: error.message + '. An account may already exist for this email. Try resetting your password.', 
					toastTitle: "Error", 
					showed : true
				});
			});
	}

	sendResetRequest = async (username, password, confirmPassword) => {
		await axios.post("https://cx-shield.herokuapp.com/api/user/reset",{
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                returnUrl : window.location.href
            })
            .then((response) => {
                this.setState({ 
					errors: "Email Sent! Please check your email and click the link to finalize the password reset. Once finished, login to the microsite! Emails can take up to 5 minutes.", 
					toastTitle: "Success", 
					showed : true,
					reset_username: "",
					reset_password: "",
					confirm_reset_password: ""
				});
            })
            .catch((error) => {
                this.setState({ 
					errors: error.message, 
					toastTitle: "Error", 
					showed : true
				});
            });
	}

	handleFlipRegister = async (event) => {
		event.preventDefault();

		if(this.state.isFlipped){
			await this.setState({ screen: "login" })
		} else {
			await this.setState({ screen: "register" })
		}

		await this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
	}

	handleFlipLoginWithCode = async (event) => {
		event.preventDefault();

		if(this.state.isFlipped){
			await this.setState({ screen: "login" })
		} else {
			await this.setState({ screen: "loginWithCode" })
		}

		await this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
	}

	handleFlipReset = async (event) => {
		event.preventDefault();

		if(this.state.isFlipped){
			await this.setState({ screen: "login" })
		} else {
			await this.setState({ screen: "reset" })
		}

		await this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
 	}

	render() {
		return (
			<div id="auth">
				<Container>
					<Row>
						<Col sm={12} md={3} />
						<Col sm={12} md={6}>
							<div style={{ position: 'absolute', zIndex: 1, top: 10, right: -20 }} >
								<Toast onClose={this.setToastClose} show={this.state.showed} delay={15000} autohide>
									<Toast.Header>
										<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
										<strong className="mr-auto">{this.state.toastTitle}</strong>
									</Toast.Header>
									<Toast.Body>{this.state.errors}</Toast.Body>
								</Toast>
							</div>
							<ReactCardFlip isFlipped={this.state.isFlipped} infinite>
								<div id="loginFormContainer">
									<Login
										{...this.props} 
										sendRequest={this.sendLoginRequest}
										handleChange={this.handleChange}
										login_username={this.state.login_username}
										login_password={this.state.login_password}
									/>
									<div className="card" style={{marginTop: 16}}>
										<div className="card-body slds-grid">
											{/* <Button onClick={this.handleFlipLoginWithCode} variant="link" className="text-theme slds-col" block>Access Code Login</Button> */}
											<Button onClick={this.handleFlipRegister} variant="link" className="text-theme slds-col" block>Create Account</Button>
											<Button onClick={this.handleFlipReset} variant="link" className="text-theme slds-col" block>Reset Password</Button>
										</div>
									</div>
									
								</div>

								
								<div id="formContainer">
									{ this.state.screen === "reset" ? (
										<div>
											<ResetPassword 
												{...this.props} 
												handleFlip={this.handleFlipReset} 
												sendRequest={this.sendResetRequest}
												handleChange={this.handleChange}
												reset_username={this.state.reset_username}
												reset_password={this.state.reset_password}
												confirm_reset_password={this.state.confirm_reset_password}
											/>
											<div className="card" style={{marginTop: 16}}>
												<div className="card-body slds-grid">
												<Button onClick={this.handleFlipReset} variant="link" className="text-theme slds-col" block >
													Return to Login
												</Button>
												</div>
											</div>
											
										</div>
									) : null }
									{ this.state.screen === "register" ? (
										<div>
											<Register 
												{...this.props} 
												handleFlip={this.handleFlipRegister} 
												sendRequest={this.sendRegisterRequest}
												handleChange={this.handleChange}
												register_username={this.state.register_username}
												register_password={this.state.register_password}
												register_password_confirm={this.state.register_password_confirm}
											/>
											<div className="card" style={{marginTop: 16}}>
												<div className="card-body slds-grid">
												<Button onClick={this.handleFlipRegister} variant="link" className="text-theme slds-col" block >
												Return to Login
											</Button>
												</div>
											</div>
										</div>
									) : null }
									{ this.state.screen === "loginWithCode" ? (
										<div>
											<LoginWithCode
												{...this.props} 
												handleFlip={this.handleFlipLoginWithCode} 
												sendRequest={this.sendLoginWithCodeRequest}
												handleChange={this.handleChange}
												login_with_code_username={this.state.login_with_code_username}
												login_with_code_code={this.state.login_with_code_code}
											/>
											<Button onClick={this.handleFlipLoginWithCode} variant="link" className="text-light mt-3" block>
												Return to Login
											</Button>
										</div>
									) : null }
								</div>								
							</ReactCardFlip>
						</Col>
						<Col sm={12} md={3} />
					</Row>
				</Container>
			</div>
		);
	}
}