import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, Button, TextField, Divider, Typography } from "@material-ui/core";
import { auth } from "./firebase";
import { UserContext } from "./UserContext";
import "./Login.css";

function Login({ history }) {
	const [user, setUser] = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (user) {
			history.push("/");
		}
		console.log("login", user);
	}, [user, history]);

	const signIn = (event) => {
		event.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				console.log("here", user);
				setUser(user);
			})
			.catch((error) => alert(error.message, error.code));

		// Set to none after creating an account.
		setEmail("");
		setPassword("");

		if (user) {
			history.push("/");
		}
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
					<form className="login__signin">
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
