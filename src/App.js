import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import { useCountryInfo, getCountryInfo, useCountriesData } from "./api";
import numeral from "numeral";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import "./App.css";
import { sortData, printNumbers } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
	// STATE = How to write a variable in React
	// const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [url, setUrl] = useState("https://disease.sh/v3/covid-19/all");

	// const [countryInfo, setCountryInfo] = useState({});

	// const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.8, lng: -40.4 });
	const [mapZoom, setMapZoom] = useState(3);
	// const [mapCountries, setMapCountries] = useState([]);

	const [casesType, setCasesType] = useState("cases");

	// const { loading, todayInfo, error } = useTodayInfo();
	const { loading, countryInfo, error } = useCountryInfo(url);
	const { loading2, sortedData, countries2, error2 } = useCountriesData();

	// console.log(loading2);
	// console.log(sortedData);
	// console.log(countries2);
	// console.log(error2);
	// console.log(tableData);

	// useEffect(() => {
	// 	// getTodayInfo().then((info) => setCountryInfo(info));
	// 	// or,
	// 	// fetch("https://disease.sh/v3/covid-19/all")
	// 	// 	.then((response) => response.json())
	// 	// 	.then((data) => {
	// 	// 		setCountryInfo(data);
	// 	// 	});
	// }, []);

	// useEffect = Runs a piece of code based on a given condition
	// square bracket: The code inside here will run once when the component loads and not again.
	useEffect(() => {
		// async -> send a request, wait for it, do something with info.
		// Needs to find a way to extract this into api.js
		// const getCountriesData = async () => {
		// 	try {
		// 		// Promise
		// 		const url = "https://disease.sh/v3/covid-19/countries";
		// 		const response = await fetch(url);
		// 		const data = await response.json(); // this also needs to be awaited!!
		// 		// console.log("Data:", data);
		// 		// Don't wanna use all of 'data', wanna restructure it.
		// 		const countries = data.map((country) => ({
		// 			name: country.country,
		// 			value: country.countryInfo.iso2,
		// 		}));
		// 		const sortedData = sortData(data); // Sort by cases in descending order.
		// 		setTableData(sortedData);
		// 		setMapCountries(data);
		// 		// console.log(data);
		// 		setCountries(countries); // Put all contries in the array, so that mapping out in Dropdown.
		// 		// // });
		// 	} catch (error) {
		// 		console.log("getCountriesData:", error);
		// 	}
		// };
		// getCountriesData();
		// console.log(loading);
		// console.log(countryInfo);
		// console.log(error);
	}, []);

	const onCountryChange = async (event) => {
		try {
			let countryCode = event.target.value;
			const url =
				countryCode === "worldwide"
					? "https://disease.sh/v3/covid-19/all"
					: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
			console.log(url);

			// Needs to resolve right now in this method. if resolved using useState Hooks, it results in delaying one cycle(one onChange delay).
			// Needs to resolve right now using fetch(or Axios, if needed)
			const info = await getCountryInfo(url); //fetch(url)
			// .then((response) => response.json())
			// .then((data) => {
			setCountry(countryCode); //
			setUrl(url);

			// setCountryInfo(data); // redundant?
			console.log(info);

			setMapCenter(
				// use 'lat,lng', not 'lat,long' as api did.
				countryCode !== "worldwide" ? [info.countryInfo.lat, info.countryInfo.long] : { lat: 34.8, lng: -40.4 }
			);
			setMapZoom(countryCode !== "worldwide" ? 4 : 3);
			console.log(loading);
			console.log(countryInfo);
			console.log(error);
			// });
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Something went wrong: {error.message}</p>;
	}

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select variant="outlined" onChange={onCountryChange} value={country}>
							{/* Loop through all the countries and show a dropdown list of the options */}
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries2.map(({ value, name }) => (
								<MenuItem value={value}>{name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="app__stats">
					<InfoBox
						isRed
						// if, in this box, casesType is "cases", this box will active
						active={casesType === "cases"}
						onClick={(e) => setCasesType("cases")}
						title="Coronavirus cases"
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
			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={sortedData} key={sortedData.toString()} />
					<h3 className="app__graphTitle">Worldwide New {casesType}</h3>
					<LineGraph className="app__graph" casesType={casesType} />
					{/* Graph */}
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
