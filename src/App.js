import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import "./App.css";

function App() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/signup" component={SignUp} />
			<Route exact path="/login" component={Login} />
			<Route
				exact
				render={({ location }) => (
					<div>
						<h2>Not Found</h2>
						<p>{location.pathname}</p>
					</div>
				)}
			/>
		</Switch>
	);
}

export default App;
