import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColours = {
	cases: {
		hex: "#CC1034",
		multiplier: 400,
	},
	recovered: {
		hex: "#7dd71d",
		multiplier: 700,
	},
	deaths: {
		hex: "#fb4443",
		multiplier: 1000,
	},
};

// for displaying 'Live Cases by Country'
export const sortData = (data) => {
	const sortedData = [...data];

	// sort loops through all items in array, and compare then put them in descending order
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
	// or,
	// 	if (a.cases > b.cases) {
	// 		return -1; //false
	// 	} else {
	// 		return 1; //true
	// 	}
	// });
	// return sortedData;
};

export const printNumbers = (stat) => (stat ? `+${numeral(stat).format("0.0a")}` : "+0");

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
	data.map((country) => (
		<Circle // in leaflet, use 'lat,long', not 'lat,lng'
			key={country.country}
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={casesTypeColours[casesType].hex}
			fillColor={casesTypeColours[casesType].hex}
			radius={Math.sqrt(country[casesType]) * casesTypeColours[casesType].multiplier}
		>
			<Popup>
				<div className="info-container">
					<div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
					<div className="info-name">{country.country}</div>
					<div className="info-confirmed">Cases: {numeral(country.cases).format(0.0)}</div>
					<div className="info-recovered">Recovered: {numeral(country.recovered).format(0.0)}</div>
					<div className="info-deaths">Deaths: {numeral(country.deaths).format(0.0)}</div>
				</div>
			</Popup>
		</Circle>
	));

export const buildChartData = (data, casesType = "cases") => {
	// if don't pass anytning, it would be 'cases' by default.
	const chartData = [];
	let lastDataPoint;

	for (let date in data.cases) {
		if (lastDataPoint) {
			let newDataPoint = {
				x: date, // dat'e'
				y: data[casesType][date] - lastDataPoint, // dat'a'
				//to get daily's new cases, today's total - yesterday's total
			};
			// console.log(newDataPoint);
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[casesType][date];
	}
	return chartData;
};
