import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent, Button } from "@material-ui/core";
import { auth } from "./firebase";
import { useCountryInfo, getCountryInfo, useCountriesData } from "./api";
import numeral from "numeral";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import "./Home.css";
import { printNumbers } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function Home({ history }) {
	// STATE = How to write a variable in React
	const [country, setCountry] = useState("worldwide");
	const [url, setUrl] = useState("https://disease.sh/v3/covid-19/all");
	const [mapCenter, setMapCenter] = useState({ lat: 34.8, lng: -40.4 });
	const [mapZoom, setMapZoom] = useState(3);
	const [casesType, setCasesType] = useState("cases");
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");

	const { loading, countryInfo, error } = useCountryInfo(url);
	const { loadingCountries, sortedData, mapCountries, errorCountries } = useCountriesData();

	useEffect(() => {
		// listener
		auth.onAuthStateChanged((user) => {
			if (user) {
				// user is signed in,
				console.log(user);
				setUser(user);
			} else {
				// user is signed out
				setUser(null);
				history.push("/login");
			}
		});
	}, [user, username]);

	const goSignUp = (event) => {
		event.preventDefault();
		history.push("/login");
	};

	const signOut = () => {
		auth.signOut();
		history.push("/login");
	};

	const onCountryChange = async (event) => {
		try {
			let countryCode = event.target.value;
			const url =
				countryCode === "worldwide"
					? "https://disease.sh/v3/covid-19/all"
					: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
			console.log(url);

			// Needs to resolve right now in this method. if resolved using useState Hooks, it results in delaying one cycle(one onChange delay).
			// Needs to resolve right now using fetch(or Axios, if needed, or anyway of resolving)
			const info = await getCountryInfo(url); // cannot use useCountryInfo here.

			setCountry(countryCode);
			setUrl(url);
			setMapCenter(
				// use 'lat,lng', not 'lat,long' as api did.
				countryCode !== "worldwide" ? [info.countryInfo.lat, info.countryInfo.long] : { lat: 34.8, lng: -40.4 }
			);
			setMapZoom(countryCode !== "worldwide" ? 4 : 3);
		} catch (error) {
			console.log(error);
		}
	};

	if (loading || loadingCountries) {
		return <div className="loader"></div>;
	}
	if (error) {
		return <p>Something went wrong: {error.message}</p>;
	}
	if (errorCountries) {
		return <p>Something went wrong: {errorCountries.message}</p>;
	}

	return (
		<div className="home">
			<div className="home__left">
				<div className="home__header">
					<h1>COVID-19 TRACKER</h1>
					{user ? (
						<Button variant="outlined" className="login__signup" onClick={signOut}>
							Logout
						</Button>
					) : (
						history.push("/login")
					)}

					<FormControl className="home__dropdown">
						<Select variant="outlined" onChange={onCountryChange} value={country}>
							{/* Loop through all the countries and show a dropdown list of the options */}
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{mapCountries.map(({ value, name }) => (
								<MenuItem key={value} value={value}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="home__stats">
					<InfoBox
						isRed
						// if, in this box, casesType is "cases", this box will active
						active={casesType === "cases"}
						onClick={(e) => setCasesType("cases")}
						title="Confirmed Cases"
						cases={printNumbers(countryInfo.todayCases)}
						total={numeral(countryInfo.cases).format("0,0")}
					/>
					<InfoBox
						active={casesType === "recovered"}
						onClick={(e) => setCasesType("recovered")}
						title="Recovered"
						cases={printNumbers(countryInfo.todayRecovered)}
						total={numeral(countryInfo.recovered).format("0,0")}
					/>
					<InfoBox
						isRed
						active={casesType === "deaths"}
						onClick={(e) => setCasesType("deaths")}
						title="Deaths"
						cases={printNumbers(countryInfo.todayDeaths)}
						total={numeral(countryInfo.deaths).format("0,0")}
					/>
				</div>

				{/* Map */}
				<Map casesType={casesType} countries={sortedData} center={mapCenter} zoom={mapZoom} />
			</div>

			<Card className="home__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={sortedData} key={sortedData.toString()} />
					{/* Graph */}
					<h3 className="home__graphTitle">Worldwide New {casesType}</h3>
					<LineGraph className="home__graph" casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default Home;
