import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColours = {
	cases: {
		hex: "#CC1034",
		// rgb: "rgb(204, 16, 52)",
		// half_op: "rgba(204, 16, 52, 0.5)",
		multiplier: 800,
	},
	recovered: {
		hex: "#7dd71d",
		// rgb: "rgb(125, 215, 29)",
		// half_op: "rgba(125, 215, 29, 0.5)",
		multiplier: 1200,
	},
	deaths: {
		hex: "#fb4443",
		// rgb: "rgb(251, 68, 67)",
		// half_op: "rgba(251, 68, 67, 0.5)",
		multiplier: 2000,
	},
};

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
		<Circle
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

	// console.log(data.cases);
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

	// console.log(chartData);
	return chartData;
};
