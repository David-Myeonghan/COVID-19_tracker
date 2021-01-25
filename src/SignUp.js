import React, { useState } from "react";
import { Card, CardContent, Button, TextField, Divider, Typography } from "@material-ui/core";
import "./SignUp.css";

function SignUp({ history, location, match }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signUp = (event) => {
		event.preventDefault();

		setEmail("");
		setPassword("");
	};

	const goSignIn = (event) => {
		event.preventDefault();
		history.push("/login");
	};

	return (
		<div className="signup">
			<Card className="signup__container">
				<Typography align="center" variant="h4" gutterBottom>
					Sign Up
				</Typography>
				<CardContent>
					<form className="signup__signin" noValidate autoComplete="off">
						<TextField
							id="standard-basic"
							label="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
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

						<Button type="submit" onClick={signUp}>
							Sign Up
						</Button>
					</form>
					<Divider className="signup__divider" variant="fullWidth" />
					<Button className="signup__signup" onClick={goSignIn}>
						Go back
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

export default SignUp;
