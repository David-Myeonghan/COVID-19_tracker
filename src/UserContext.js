import React, { useState, useEffect, createContext } from "react";
import { auth } from "./firebase";

export const UserContext = createContext();

export const UserProvider = (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// listener
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user is signed in,
				console.log("contest", authUser);
				setUser(authUser);
			} else {
				// user is signed out
				setUser(null);
				// history.push("/login");
			}
		});
	}, [user]);
	// [user] will not be required here as this component is using userContext...?

	return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
