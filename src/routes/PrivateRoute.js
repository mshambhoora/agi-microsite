import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";


export default class PrivateRoute extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			customComponent: ""
		};
	}
	componentWillMount() {
		this.handleVerifyRequest();
	}

	handleVerifyRequest = () => {
		const Component = this.props.component;
		
		if (Cookies.get("accessToken") == null || Cookies.get("accessToken") === undefined) {
			this.setState({customComponent: <Redirect to={{ pathname: "/" }} />});
		} else {
			axios.post("https://cx-shield.herokuapp.com/api/auth/verify",{
				token: Cookies.get("accessToken")
			})
			.then((result) => {				
				if (result.data === true) {
					this.setState({customComponent: <Component />});
				} else {
					this.setState({customComponent: <Redirect to={{ pathname: "/" }} />});
				}

				return;
			})
			.catch((error) => {
				this.setState({customComponent: <Redirect to={{ pathname: "/" }} />});

				return;
			});
		}
	 }

	render() {
		return (<div>{this.state.customComponent}</div>)
	}
}
