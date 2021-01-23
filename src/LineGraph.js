import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { useCovidRecord } from "./api";

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0,0");
				// var label = data.datasets[tooltipItem.datasetIndex].label || "";

				// if (label) {
				// 	label += ": ";
				// }
				// label += Math.round(tooltipItem.yLabel * 100) / 100;
				// return label;
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					// Include a dollar sign in the ticks
					callback: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			},
		],
	},
};

function LineGraph({ casesType = "cases", ...props }) {
	const { loading, covidRecord, error } = useCovidRecord(casesType);

	// console.log(loading);
	// console.log(covidRecord);
	// console.log(error);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				let chartData = buildChartData(data, casesType);
	// 				console.log(chartData);
	// 				setData(chartData);
	// 				console.log(data);
	// 			});
	// 	};
	// 	fetchData();
	// }, [casesType]);

	if (loading) {
		return <p>loading...</p>;
	}

	if (error) {
		return <p>Something went swonf: {error.message}</p>;
	}

	return (
		<div className={props.className}>
			{covidRecord?.length > 0 && (
				// if it exists, elegant way of error handling. Same with covidRecord && covidRecord.length
				<Line
					options={options}
					data={{
						datasets: [
							{
								backgroundColor: "rgba(204, 100, 100)",
								borderColor: "#CC1034",
								data: covidRecord,
							},
						],
					}}
				/>
			)}
		</div>
	);
}

export default LineGraph;
