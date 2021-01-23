import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import { getTodayInfo, useTodayInfo } from "./api";
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
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");

	const [countryInfo, setCountryInfo] = useState({});

	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 37, lng: 127.5 });
	const [mapZoom, setMapZoom] = useState(4);
	const [mapCountries, setMapCountries] = useState([]);

	const [casesType, setCasesType] = useState("cases");

	const { loading, todayInfo, error } = useTodayInfo();

	useEffect(() => {
		// getTodayInfo().then((info) => setCountryInfo(info));
		// or,
		// fetch("https://disease.sh/v3/covid-19/all")
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setCountryInfo(data);
		// 	});
	}, []);

	// useEffect = Runs a piece of code based on a given condition
	// square bracket: The code inside here will run once when the component loads and not again.
	useEffect(() => {
		// async -> send a request, wait for it, do something with info.
		// Needs to find a way to extract this into api.js
		const getCountriesData = async () => {
			try {
				// Promise
				const url = "https://disease.sh/v3/covid-19/countries";
				const response = await fetch(url);
				const data = await response.json(); // this also needs to be awaited!!
				// console.log("Data:", data);

				// Don't wanna use all of 'data', wanna restructure it.
				const countries = data.map((country) => ({
					name: country.country,
					value: country.countryInfo.iso2,
				}));

				const sortedData = sortData(data); // Sort by cases in descending order.
				setTableData(sortedData);
				setMapCountries(data);
				console.log(data);
				setCountries(countries); // Put all contries in the array, so that mapping out in Dropdown.
				// // });
			} catch (error) {
				console.log("getCountriesData:", error);
			}
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		console.log(url);

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);

				setCountryInfo(data); // redundant?
				console.log(countryInfo);

				setMapCenter((countryCode = [data.countryInfo.lat, data.countryInfo.long]));
				setMapZoom(4);
			});
	};

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select variant="outlined" onChange={onCountryChange} value={country}>
							{/* Loop through all the countries and show a dropdown list of the options */}
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
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
						cases={printNumbers(todayInfo.todayCases)}
						total={numeral(todayInfo.cases).format("0,0")}
					/>
					<InfoBox
						active={casesType === "recovered"}
						onClick={(e) => setCasesType("recovered")}
						title="Recovered"
						cases={printNumbers(todayInfo.todayRecovered)}
						total={numeral(todayInfo.recovered).format("0,0")}
					/>
					<InfoBox
						isRed
						active={casesType === "deaths"}
						onClick={(e) => setCasesType("deaths")}
						title="Deaths"
						cases={printNumbers(todayInfo.todayDeaths)}
						total={numeral(todayInfo.deaths).format("0,0")}
					/>
				</div>

				{/* Map */}
				<Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
			</div>
			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} key={tableData.toString()} />
					<h3 className="app__graphTitle">Worldwide New {casesType}</h3>
					<LineGraph className="app__graph" casesType={casesType} />
					{/* Graph */}
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
