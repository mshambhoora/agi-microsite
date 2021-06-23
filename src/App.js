import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import Authenticate from "./views/auth/Authenticate";
import Microsite from "./views/microsite/Microsite";
import PageNotFound from "./errors/PageNotFound";

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Authenticate} />
					<Route exact path="/auth" component={Authenticate} />

					<PrivateRoute exact path="/microsite" component={Microsite} />

					<Route component={PageNotFound} />
				</Switch>
			</Router>
		);
	}
}
