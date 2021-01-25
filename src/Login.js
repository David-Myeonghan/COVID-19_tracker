import React, { useState } from "react";
import { Card, CardContent, Button, TextField, Divider, Typography } from "@material-ui/core";
import "./Login.css";

function Login({ history, location, match }) {
	// const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = (event) => {
		event.preventDefault();

		// auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));

		setEmail("");
		setPassword("");
	};

	const goSignUp = (event) => {
		event.preventDefault();
		history.push("/signup");
	};

	return (
		<div className="login">
			<Card className="login__container">
				<Typography align="center" variant="h4" gutterBottom>
					Covid-19 Tracker
				</Typography>
				<CardContent>
					<form className="login__signin" noValidate autoComplete="off">
						<TextField
							id="standard-basic"
							label="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							id="standard-basic"
							label="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button type="submit" onClick={signIn}>
							Sign In
						</Button>
					</form>
					<Divider className="login__divider" variant="fullWidth" />
					<br />
					<Typography align="center" variant="subtitle2" gutterBottom>
						If you don't have an account,
					</Typography>
					<Button className="login__signup" onClick={goSignUp}>
						Sign Up
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

export default Login;
